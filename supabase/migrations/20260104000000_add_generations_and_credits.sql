-- Create generations table
CREATE TABLE IF NOT EXISTS public.generations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    creem_customer_id text, -- Optional link to creem customer if needed
    prompt text,
    model_id text,
    image_url text, -- The result image
    input_image_url text, -- The source image
    status text CHECK (status IN ('pending', 'processing', 'succeeded', 'failed')),
    credits_cost integer DEFAULT 10,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own generations"
    ON public.generations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage generations"
    ON public.generations FOR ALL
    USING (auth.role() = 'service_role');

-- Grant access to service role
GRANT ALL ON public.generations TO service_role;

-- Update handle_new_user function to give 10 credits instead of 3
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Auto-create customer record for new user
  INSERT INTO public.customers (
    user_id,
    email,
    credits,
    creem_customer_id,
    created_at,
    updated_at,
    metadata
  ) VALUES (
    NEW.id,
    NEW.email,
    10, -- Updated to 10 credits per strategy
    'auto_' || NEW.id::text,
    NOW(),
    NOW(),
    jsonb_build_object(
      'source', 'auto_registration',
      'initial_credits', 10,
      'registration_date', NOW()
    )
  );

  -- Record initial credit history
  INSERT INTO public.credits_history (
    customer_id,
    amount,
    type,
    description,
    created_at,
    metadata
  ) VALUES (
    (SELECT id FROM public.customers WHERE user_id = NEW.id),
    10, -- Updated to 10
    'add',
    'Welcome bonus for new user registration',
    NOW(),
    jsonb_build_object(
      'source', 'welcome_bonus',
      'user_registration', true
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

import { createClient } from "@/utils/supabase/server";
import CreateClient from "@/components/feature/create-client";

// Required for Cloudflare Pages deployment
export const runtime = 'edge';

export default async function CreatePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <CreateClient user={user} />
    );
}

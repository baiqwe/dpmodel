import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'DeepSeek Model1 Online Playground'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #000000, #111827)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 40,
                    }}
                >
                    {/* Logo Icon */}
                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 20,
                            background: '#3b82f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 20,
                            boxShadow: '0 0 50px rgba(59, 130, 246, 0.5)',
                        }}
                    >
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.5" />
                            <path d="M12 2v20" />
                            <path d="M2 12h20" />
                            <circle cx="12" cy="12" r="3" fill="white" />
                        </svg>
                    </div>
                    <div style={{ fontSize: 60, fontWeight: 800, letterSpacing: '-0.025em' }}>
                        DeepSeek Model1
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '10px 30px',
                        borderRadius: 50,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        marginBottom: 40,
                    }}
                >
                    <div style={{ fontSize: 24, color: '#9ca3af' }}>Online Playground & API</div>
                </div>

                <div style={{ display: 'flex', gap: 40, marginTop: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: 40, fontWeight: 'bold', color: '#60a5fa' }}>FlashMLA</div>
                        <div style={{ fontSize: 20, color: '#9ca3af' }}>Architecture</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: 40, fontWeight: 'bold', color: '#c084fc' }}>128K</div>
                        <div style={{ fontSize: 20, color: '#9ca3af' }}>Context</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: 40, fontWeight: 'bold', color: '#4ade80' }}>Free</div>
                        <div style={{ fontSize: 20, color: '#9ca3af' }}>Access</div>
                    </div>
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}

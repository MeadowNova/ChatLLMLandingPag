
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatLLM Master Training Course | Abacus.AI',
  description: 'Master Large Language Models with hands-on training and AI-powered guidance. From novice to expert with our comprehensive ChatLLM course.',
  keywords: ['ChatLLM', 'AI Training', 'Machine Learning', 'Large Language Models', 'Abacus.AI'],
  authors: [{ name: 'ChatLLM Mastery' }],
  creator: 'ChatLLM Mastery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Script
          id="chatbot-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              const urlS1 = 'https://apps.abacus.ai/chatllm/?appId=1343e71caa&hideTopBar=2';
              (function() {
                let UserWidgetData = {
                  "topName": "ChatLLM Mastery Mentor",
                  "darkMode": true,
                  "topColor": "#4ade80",
                  "frameWidth": 450,
                  "frameHeight": 700,
                  "circleSizePx": 30,
                  "circleColor": "#4ade80",
                  "promptAskString": "Ask me anything!"
                };

                const style = document.createElement('style');
                style.textContent = \`
                  .floating-circle {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: \${(UserWidgetData?.circleSizePx || 30)*2}px;
                    height: \${(UserWidgetData?.circleSizePx || 30)*2}px;
                    border-radius: 50%;
                    background-color: \${UserWidgetData?.circleColor || '#4ade80'};
                    box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
                    cursor: pointer;
                    z-index: 9999;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    border: 2px solid rgba(74, 222, 128, 0.2);
                  }
                  .floating-circle:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
                  }
                  .floating-circle:active {
                    transform: scale(0.95);
                  }
                  .floating-iframe {
                    position: fixed;
                    bottom: 85px;
                    right: 20px;
                    width: 0;
                    height: 0;
                    background: white;
                    border: none;
                    z-index: 20000;
                    opacity: 0;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    overflow: hidden;
                  }
                  .floating-iframe.open {
                    width: \${UserWidgetData?.frameWidth || 450}px;
                    height: \${UserWidgetData?.frameHeight || 700}px;
                    opacity: 1;
                  }
                \`;
                document.head.appendChild(style);

                const circle = document.createElement('div');
                circle.className = 'floating-circle';
                circle.innerHTML = '💬';
                circle.title = 'ChatLLM Mastery Mentor - Ask me anything!';
                document.body.appendChild(circle);

                const iframe = document.createElement('iframe');
                iframe.className = 'floating-iframe';
                iframe.src = urlS1;
                iframe.allow = 'microphone; camera';
                document.body.appendChild(iframe);

                let isOpen = false;
                circle.addEventListener('click', () => {
                  isOpen = !isOpen;
                  iframe.classList.toggle('open', isOpen);

                  // Update circle appearance when chat is open
                  if (isOpen) {
                    circle.style.backgroundColor = '#22c55e';
                    circle.innerHTML = '✕';
                  } else {
                    circle.style.backgroundColor = UserWidgetData.circleColor;
                    circle.innerHTML = '💬';
                  }
                });

                // Close chat when clicking outside
                document.addEventListener('click', (e) => {
                  if (isOpen && !circle.contains(e.target) && !iframe.contains(e.target)) {
                    isOpen = false;
                    iframe.classList.remove('open');
                    circle.style.backgroundColor = UserWidgetData.circleColor;
                    circle.innerHTML = '💬';
                  }
                });
              })();
            `
          }}
        />
      </body>
    </html>
  )
}

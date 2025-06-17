import { Calculator } from '@/components/calc/Calculator';
import { Result } from '@/components/calc/Result';
import { Label } from '@/components/ui/label';
import { createFileRoute } from '@tanstack/react-router';
import mixpanel from 'mixpanel-browser';

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!, {
  debug: true,
  track_pageview: true,
  persistence: 'localStorage',
});

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen flex items-center justify-center flex-col">
      <header className="flex items-center pb-4">
        <img
          src="/icon.png"
          alt="저축하장"
          className="w-10 h-10"
        />
        <Label className="text-xl">토파즈 저축 계산기</Label>
      </header>
      <Calculator />
      <div className="h-6" />
      <Result />
    </div>
  );
}

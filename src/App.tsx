import { Calculator } from './components/calc/Calculator';
import { Result } from './components/calc/Result';
import { Label } from './components/ui/label';

const App = () => {
  return (
    <div className="w-screen flex items-center justify-center flex-col">
      <header className="flex items-center pb-4">
        <img
          src="/icon.png"
          alt="저축하장"
          className="w-10 h-10"
        />
        <Label className="text-xl">저축 계산기</Label>
      </header>
      <Calculator />
      <div className="h-6" />
      <Result />
    </div>
  );
};

export default App;

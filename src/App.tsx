import { useRef } from 'react';
import './App.css';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

function App() {
  const Numbers = Array.from(Array(20).keys());
  const Articles = Numbers.map((data) => {
    const Ref = useRef<HTMLHeadingElement>(null);
    return {
      id: `${data + 1}`,
      title: `Article${data + 1}`,
      ElementRef: Ref,
    };
  });
  useIntersectionObserver(
    Articles.map((data) => data.ElementRef),
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      rootMargin: '1px',
      threshold: 0.2,
    }
  );
  return (
    <main className="flex flex-col gap-[15px]">
      <nav className="fixed top-0 bg-blue-300 w-screen z-[999px] rounded-xl">
        <div className="flex justify-center items-center relative">
          <div>
            <h1 className="text-center pl-[25px]">なんとか高校</h1>
          </div>
        </div>
      </nav>

      {Articles.map((data) => {
        return (
          <div id={data.id} className="bg-blue-200 rounded-md p-[10px]">
            <h3 className="heading" ref={data.ElementRef}>
              {data.title}
            </h3>
            <p>デデドン！</p>
          </div>
        );
      })}
    </main>
  );
}

export default App;

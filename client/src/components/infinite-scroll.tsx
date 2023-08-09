import { CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export interface Props {
  className?: string;
  onTouchAnchor: () => void;
  threshold: number;
  children: JSX.Element | JSX.Element[];
  hasNextPage: boolean;
  isLoading: boolean;
}

function InfiniteScroll(props: Props) {
  const { className, onTouchAnchor, threshold } = props;
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          onTouchAnchor();
        }
      },
      { threshold }
    )
  );
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement as any);
      }
    };
  }, [element]);

  return (
    <>
      {props.children}
      {props.hasNextPage && !props.isLoading && (
        <CircularProgress size={35} ref={setElement} />
      )}
    </>
  );
}

export default InfiniteScroll;

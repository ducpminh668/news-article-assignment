export default function Result({ amount }: { amount: string }) {
  return (
    <div className='text-primary font-bold text-lg'>
      {amount} ARTICLES FOUND
    </div>
  );
}

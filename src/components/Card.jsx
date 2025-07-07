function Card({ children }) {
  return (
    <div className="bg-slate-600 md:w-1/2 rounded-sm text-white p-6 shadow-lg hover:shadow-2xl space-y-4">
      {children}
    </div>
  );
}

export default Card;

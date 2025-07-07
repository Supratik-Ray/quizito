function ProgressBar({ index, numQuestions, answered }) {
  return (
    <div className="my-10 lg:my-20">
      <span className="text-white text-lg mr-4">
        {(((index + Number(answered)) / numQuestions) * 100).toFixed(2)}%
      </span>
      <progress
        max={numQuestions}
        value={index + Number(answered)}
        className="[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:w-50 [&::-webkit-progress-value]:w-50 md:[&::-webkit-progress-bar]:w-150 [&::-webkit-progress-value]:rounded-lg md:[&::-webkit-progress-value]:w-150 [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-violet-400 [&::-moz-progress-bar]:bg-violet-400"
      />
    </div>
  );
}

export default ProgressBar;

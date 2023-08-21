const AnimatedSkeleton = ({ count }) => {
    const generateSkeletons = (count) => {
      const skeletons = [];
      for (let i = 0; i < count; i++) {
        skeletons.push(
          <div key={i} className="text-center animate-opacityAnimation flex flex-col gap-3">
            <progress class="progress progress-accent w-56" value="0" max="100"></progress>
            <progress class="progress progress-accent w-56" value="10" max="100"></progress>
            <progress class="progress progress-accent w-56" value="40" max="100"></progress>
            <progress class="progress progress-accent w-56" value="70" max="100"></progress>
            <progress class="progress progress-accent w-56" value="100" max="100"></progress>
          </div>
        );
      }
      return skeletons;
    };
  
    return (
      <div className="flex justify-center flex-wrap gap-y-8 gap-x-3">
        {generateSkeletons(count)}
      </div>
    );
  };
  
  export default AnimatedSkeleton;
  
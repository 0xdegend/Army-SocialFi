import React from 'react'

const PointsRanking = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-white font-orbitron lg:text-2xl text-xl font-bold">
        Points & Ranking Awards
      </h1>
      <p className="text-sm lg:text-base font-inconsolata text-white mt-4">
        UNFK Points are awarded to Agents for pranking corrupt corporations and
        completing missions such as recruiting agents, magnifying content,
        playing games, and IRL activations.
      </p>
      <p className="text-sm lg:text-base font-inconsolata text-white mt-2">
        Total points earned are counted towards a forthcoming $UNFK airdrop
        program that will be announced in Dec (likely sooner).
      </p>
      <p className="text-sm lg:text-base font-inconsolata text-white mt-2">
        Total points also increase your agent level, your multiplier, and other
        exclusive benefits. Subject to terms and conditions.
      </p>
      {/* rewards area */}
      <div className="flex flex-col w-full mt-6">
        <h1 className="text-white font-orbitron lg:text-2xl text-xl font-bold">
          Weekly Prank Awards
        </h1>
        <p className="text-sm lg:text-base font-inconsolata text-white mt-4">
          We're dropping $10k a week to the top UNFK Agents:
        </p>
        <p className="text-sm lg:text-base font-inconsolata text-white mt-4 ">
          Top Points Earner
        </p>
        <p className="text-sm lg:text-base font-inconsolata text-white ">
          MemeLords
        </p>
        <p className="text-sm lg:text-base font-inconsolata text-white ">
          Random Agents
        </p>
        <p className="text-sm lg:text-base font-inconsolata text-white ">
          Special Agents
        </p>
        <p className="text-sm lg:text-base font-inconsolata text-white mt-4">
          Points earned each week count towards weekly SOL airdrops, and get
          reset to zero at 11:59pm EST every Monday.
        </p>
        <p className="text-sm lg:text-base font-inconsolata text-white mt-2">
          We designed this to reward total contribution while democratising
          access to weekly rewards.
        </p>
      </div>
      {/* end of rewards area */}
      {/* direct recruites */}
      <div className="w-full flex flex-col">
        <h1 className="text-white font-orbitron lg:text-2xl text-xl font-bold">
          Direct Recruits
        </h1>
        <p className="text-sm lg:text-base font-inconsolata text-white mt-4">
          Share your Agent code and earn 5000 points per Agent you recruit, up
          to 5x a week.
        </p>
      </div>
      {/* end of  direct recruites */}
      {/* points break */}
      <div className="w-full flex flex-col">
        <h1 className="text-white font-orbitron lg:text-2xl text-xl font-bold">
          Direct Recruits
        </h1>
        <p className="text-sm lg:text-base font-inconsolata text-white mt-4">
          Share your Agent code and earn 5000 points per Agent you recruit, up
          to 5x a week.
        </p>
      </div>
      {/* end point breaks */}
      {/* points break */}
      <div className="w-full flex flex-col">
        <h1 className="text-white font-orbitron lg:text-2xl text-xl font-bold">
          Point Multipliers
        </h1>
        <p className="text-sm lg:text-base font-inconsolata text-white mt-4">
          Each level achieved grants you a new multiplier. Every point you earn
          from recruiting agents or farming points is multiplied by your point
          multiplier.
        </p>
        <p className="text-sm lg:text-base font-inconsolata text-white mt-4">
          If you have a 2x multiplier, and you earn 10,000 points by recruiting
          two new Agents, you get:
        </p>
        <p className="text-sm lg:text-base font-inconsolata text-white mt-4">
          10,000 points x 2 = 20,000 points
        </p>
        <p className="text-sm lg:text-base font-inconsolata text-white mt-4">
          Your current multiplier:
        </p>
      </div>
      {/* end point breaks */}
    </div>
  );
}

export default PointsRanking

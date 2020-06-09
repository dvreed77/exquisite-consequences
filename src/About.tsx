import React from "react";

export function About() {
  return (
    <div className="text-xl text-gray-700">
      <p className="mt-6">
        <i>Exquisite Consequences</i> is an experiment in Generative Art.
      </p>
      <p className="mt-6">
        You and other users of this app will be working cooperatively to commit
        to a larger work of art.
      </p>
      <p className="mt-6">
        Typically{" "}
        <a href="https://en.wikipedia.org/wiki/Generative_art">
          Generative Art
        </a>{" "}
        involves an artist handing an artistic process over to an computer
        algorithm which often leads to surprise by discovering interesting ways
        that algorithm progresses over time.
      </p>
      <p className="mt-6">
        <i>Exquisite Consequences</i> replaces the computer with other humans
        who develop language and line work which together will eventually form a
        larger piece of work.
      </p>
      <p className="mt-6">
        The name <i>Exquisite Consequences</i> is a nod to the artistic method{" "}
        <a href="https://en.wikipedia.org/wiki/Exquisite_corpse">
          Exquisite corpse
        </a>{" "}
        and the associated parlour game, Consequences in which people work
        together, cooperatively to generate a piece of work.
      </p>

      <p className="mt-6">Thank you for your time.</p>
    </div>
  );
}

const Student = ({ name, major, numCredits, fromWisconsin, interests }) => {
  return (
    <div className="h-100 border border-dark px-2 py-2">
      <h2>
        {name.first} {name.last}
      </h2>

      <h6>{major}</h6>

      <p>
        {name.first} is taking {numCredits} credits and is{" "}
        {fromWisconsin ? "" : "NOT"} from Wisconsin
      </p>

      <p>They have {interests.length} interests including...</p>

      <ul>
        {interests.map((inter, idx) => (
          <li key={idx} className="interest">
            {inter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Student;

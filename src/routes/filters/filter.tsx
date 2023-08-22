import './filter.css'

type FilterProps = {
    placeholder: string;
}

export default function App(message: FilterProps) {
    const { placeholder } = message;
  return (
    <label htmlFor="select">
      <select id="select" required>
        <option value="" disabled selected>
          {placeholder }
        </option>
        <option value="#">One</option>
        <option value="#">Two</option>
        <option value="#">Three</option>
        <option value="#">Four</option>
        <option value="#">Five</option>
        <option value="#">Six</option>
        <option value="#">Seven</option>
      </select>
      {/* <svg>
        <use xlinkHref="#select-arrow-down"></use>
      </svg> */}
    </label>

    /* SVG Sprites 
    <svg className="sprites">
      <symbol id="select-arrow-down" viewBox="0 0 10 6">
        <polyline points="1 1 5 5 9 1"></polyline>
      </symbol>
    </svg>
    */
  );
}

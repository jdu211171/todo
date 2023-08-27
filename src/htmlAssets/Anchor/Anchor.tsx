// You need to import React
import React from "react";

// Define an interface for the anchor props
interface AnchorProps {
  href: string; // The URL of the link's destination
  target: string; // How the link should be opened
  text: string; // The text of the link
  className: string; // The CSS class name of the link
}

// Define a functional component for the anchor element
const AnchorElement = (props: AnchorProps) => {
  // Use the props to render the anchor element
  return (
    <a href={props.href} target={props.target} className={props.className}>
      {props.text}
    </a>
  );
};

// Define an example component that uses the anchor element
const ExampleComponent = () => {
  // Render the example component with the anchor element
  return (
        <AnchorElement
          href="https://www.bing.com"
          target="_blank"
          text="Bing"
          className="link"
        />
  );
};

import styled from "styled-components";
import { Typewriter } from "react-simple-typewriter";

const StyledFooter = styled.footer`
  text-align: center;
  font-size: 1.2rem;
  position: relative;
`;

const StyledTypewriter = styled.span`
  color: var(--primary-color);
  font-weight: 600;
  font-size: 1.3rem;
`;

function Footer() {
  return (
    <StyledFooter>
      We value your{" "}
      <StyledTypewriter>
        <Typewriter
          typeSpeed={300}
          cursor={true}
          loop={0}
          words={["Privacy", "Security", "Anonymity"]}
        />
      </StyledTypewriter>
    </StyledFooter>
  );
}

export default Footer;

import { IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoActionButton = ({ icon, onClick, colorScheme, variant, label }) => {
  return (
    <IconButton
      size="xs"
      fontSize={10}
      icon={<FontAwesomeIcon icon={icon} />}
      onClick={onClick}
      aria-label={label}
      variant={variant}
      colorScheme={colorScheme}
      mr={2}
    ></IconButton>
  );
};

export default TodoActionButton;

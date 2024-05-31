import { FaTrash } from "react-icons/fa";
import { useThunk } from "../hooks/useThunk";
import { deleteUser } from "../store";
import AlbumsList from "./AlbumsList";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";

const UserListItem = ({ user }) => {
  const thunkObjs = useThunk(deleteUser);

  const handleDeleteClick = () => {
    thunkObjs[0](user.id);
  };

  const header = (
    <>
      <Button
        className="mr-3"
        loading={thunkObjs[1]}
        onClick={handleDeleteClick}
        danger
      >
        <FaTrash />
      </Button>
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UserListItem;

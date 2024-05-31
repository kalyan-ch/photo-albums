import { FaTrash } from "react-icons/fa";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { useDeleteAlbumMutation } from "../store";
import PhotoList from "./PhotoList";

const AlbumListItem = ({ alb }) => {
  const [deleteAlbum, results] = useDeleteAlbumMutation();

  const handleAlbumDelete = () => {
    deleteAlbum(alb);
  };
  const header = (
    <>
      <Button
        loading={results.isLoading}
        danger
        className="mr-2"
        onClick={handleAlbumDelete}
      >
        <FaTrash />
      </Button>
      {alb.title}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      <PhotoList album={alb} />
    </ExpandablePanel>
  );
};

export default AlbumListItem;

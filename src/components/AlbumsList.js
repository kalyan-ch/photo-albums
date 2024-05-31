import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import AlbumListItem from "./AlbumListItem";
import Button from "./Button";
import Skeleton from "./Skeleton";

const AlbumsList = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user.id);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user.id);
  };

  let content;
  if (isFetching) {
    content = <Skeleton outerClassName="h-10 w-full" numBoxes={3} />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    content = data.map((alb) => {
      return <AlbumListItem key={alb.id} alb={alb} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold">Albums for {user.name} </h3>
        <Button
          primary
          outline
          rounded
          loading={results.isLoading}
          onClick={handleAddAlbum}
        >
          Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;

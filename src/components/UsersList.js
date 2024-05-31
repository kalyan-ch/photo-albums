import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/useThunk";
import { createUser, fetchUsers } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import UserListItem from "./UserListItem";

const UsersList = () => {
  const { data } = useSelector((state) => {
    return state.users;
  });

  const [doFetchUsers, isLoadingUsers, loadingUsersErr] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(createUser);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  let content;

  if (isLoadingUsers) {
    content = <Skeleton numBoxes={6} outerClassName="h-10 w-full" />;
  } else if (loadingUsersErr) {
    content = <div>Error</div>;
  } else {
    content = data.map((user) => {

      return (
        <UserListItem user={user} key={user.id} />
      );
    });
  }

  const handleCreateUser = () => {
    doCreateUser();
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button
          loading={isCreatingUser}
          primary
          rounded
          onClick={handleCreateUser}
        >
          Add User
        </Button>
        {creatingUserError && "Error"}
      </div>
      {content}
    </div>
  );
};

export default UsersList;

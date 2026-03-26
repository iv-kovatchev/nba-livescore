const useTeamRoster = () => {
  const getInitials = (firstName: string, lastName: string) =>
    `${firstName[0]}${lastName[0]}`.toUpperCase();

  return { getInitials };
};

export default useTeamRoster;

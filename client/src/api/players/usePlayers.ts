import { useQuery } from "@tanstack/react-query";
import http from "../../services/http";
import type { IPlayer } from "../../pages/Players/Players.types";

export const usePlayers = () =>
  useQuery({
    queryKey: ["players"],
    queryFn: () => http.get<IPlayer[]>("/api/players"),
  });

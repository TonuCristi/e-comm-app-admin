import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBuilding } from "../../services/apiBuildings";

export function useDeleteBuilding() {
  const queryClient = useQueryClient();

  const { mutate: removeBuilding } = useMutation({
    mutationFn: deleteBuilding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["buildings"],
      });
    },
  });

  return { removeBuilding };
}

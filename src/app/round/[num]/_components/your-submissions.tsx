"use client";

import { Pill } from "@/components/ui/pill";
import { BLOCKSCOUT_BASE_URL } from "@/constants/data";
import apiClient from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export default function YourSubmissions({ round }: { round: number }) {
  const { address } = useAccount();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["user-submissions", address, round],
    queryFn: () => apiClient.getUserRoundSubmissions(address!, round),
    enabled: !!address,
  });

  return (
    <div className="mt-4 space-y-1">
      <h3 className="font-medium">Your Submissions</h3>
      <div className="flex flex-wrap gap-1">
        {isLoading && <Pill variant="outline">log in</Pill>}
        {isLoading && <>Loading...</>}
        {!isSuccess || (data.submissions.items.length === 0 && <Pill variant="outline">n/a</Pill>)}
        {isSuccess &&
          data.submissions.items.map((sub) => (
            <a href={`${BLOCKSCOUT_BASE_URL}tx/${sub.txnHash}/`} target="_blank" key={sub.txnHash}>
              <Pill variant="outline">{sub.entry}</Pill>
            </a>
          ))}
      </div>
    </div>
  );
}
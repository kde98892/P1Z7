"use client";

import { FollowArtistHero } from "@/(route)/_components/carousel/FavArtistEventsCarousel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ArtistCard from "@/components/ArtistCard";
import { instance } from "@/api/api";
import { ArtistType } from "@/types/index";

interface Props {
  userId: string;
}

const MyArtistTab = ({ userId }: Props) => {
  const router = useRouter();

  const { data: myArtistsData, isSuccess } = useQuery<ArtistType[]>({
    queryKey: ["myArtist"],
    queryFn: async () => {
      return instance.get(`/users/${userId}/artists`);
    },
  });

  if (!isSuccess) return;
  return (
    <div className="flex flex-col items-start gap-16 px-20 py-24 pb-88 pc:gap-24 pc:p-32 pc:pb-16">
      {!!myArtistsData?.length && (
        <button className="pl- text-14 font-500 text-blue" onClick={() => router.push("/setting/my-artist")}>
          팔로우 아티스트 수정하기
        </button>
      )}
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-wrap justify-center gap-20 pc:justify-start pc:gap-32">
          {myArtistsData?.length ? (
            myArtistsData.map((artist) => {
              if (!artist) {
                return null;
              }
              return (
                <ArtistCard
                  key={artist.id}
                  profileImage={artist.image}
                  onClick={() => {
                    router.push(`/search?keyword=${artist.name}`);
                  }}
                >
                  {artist.name}
                </ArtistCard>
              );
            })
          ) : (
            <FollowArtistHero />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyArtistTab;

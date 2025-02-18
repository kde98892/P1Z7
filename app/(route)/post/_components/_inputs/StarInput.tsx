import InitButton from "@/(route)/event/[eventId]/edit/_components/InitButton";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import InputText from "@/components/input/InputText";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import { useModal } from "@/hooks/useModal";
import { checkArrUpdate } from "@/utils/checkArrUpdate";
import { validateEdit } from "@/utils/editValidate";
import { handleEnterDown } from "@/utils/handleEnterDown";
import { PostType } from "../../page";

const EventTypeBottomSheet = dynamic(() => import("@/components/bottom-sheet/EventTypeBottomSheet"), { ssr: false });
const StarBottomSheet = dynamic(() => import("@/components/bottom-sheet/StarBottomSheet"), { ssr: false });
const ArtistModal = dynamic(() => import("@/components/modal/ArtistModal"), { ssr: false });

const StarInput = () => {
  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();
  const { modal, openModal, closeModal } = useModal();
  const { isPc } = useGetWindowWidth();

  const {
    setValue,
    formState: { defaultValues },
    watch,
  } = useFormContext<PostType>();
  const { eventType, groupId, artistNames, artists } = watch();
  const isNotMember = groupId && artistNames.length === 0;

  const handleArtistInit = () => {
    setValue("groupId", defaultValues?.groupId || "");
    setValue("groupName", defaultValues?.groupName || "");
    setValue("artists", defaultValues?.artists as string[]);
    setValue("artistNames", defaultValues?.artistNames as string[]);
  };

  useEffect(() => {
    if (isPc && bottomSheet && bottomSheet !== "event") {
      openModal(bottomSheet);
      closeBottomSheet();
    }
    if (!isPc && modal) {
      openBottomSheet(modal);
      closeModal();
    }
  }, [isPc]);

  return (
    <>
      <div className="flex-item flex flex-col gap-20 pc:gap-32">
        <div className="relative flex flex-col">
          <label className="flex items-center gap-4">
            아티스트
            {validateEdit(typeof defaultValues?.artists !== "undefined" && (checkArrUpdate(defaultValues?.artists, artists) || defaultValues?.groupId !== groupId)) && (
              <InitButton onClick={() => handleArtistInit()} />
            )}
          </label>
          <div className="grid grid-cols-2 gap-8">
            <InputText
              name="groupName"
              placeholder="아티스트 선택"
              readOnly
              onClick={() => (isPc ? openModal("firstArtist") : openBottomSheet("firstArtist"))}
              onKeyDown={(event) => handleEnterDown(event, () => (isPc ? openModal("firstArtist") : openBottomSheet("firstArtist")))}
              noButton
            />
            <InputText
              name="artistNames"
              placeholder="멤버 선택"
              readOnly
              onClick={() => (isPc ? openModal("secondArtist") : openBottomSheet("secondArtist"))}
              onKeyDown={(event) => handleEnterDown(event, () => (isPc ? openModal("secondArtist") : openBottomSheet("secondArtist")))}
            />
          </div>
          {isNotMember && <div className="pt-4 text-12 font-500 text-red">그룹 선택 시, 멤버 선택이 필수입니다.</div>}
        </div>
        <InputText
          name="eventType"
          readOnly
          placeholder="행사 유형을 선택하세요."
          tabIndex={0}
          onClick={() => openBottomSheet("event")}
          onKeyDown={(event) => handleEnterDown(event, () => openBottomSheet("event"))}
          isEdit={validateEdit(defaultValues?.eventType !== eventType)}
          onInit={() => setValue("eventType", defaultValues?.eventType || "카페")}
          noButton
        >
          행사 유형
        </InputText>
        <InputText name="groupId" hidden />
        <InputText name="artists" hidden />
      </div>
      {modal === "firstArtist" && <ArtistModal closeModal={closeModal} isFirst />}
      {modal === "secondArtist" && <ArtistModal closeModal={closeModal} />}
      {bottomSheet === "event" && <EventTypeBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} />}
      {bottomSheet === "firstArtist" && <StarBottomSheet closeBottomSheet={closeBottomSheet} isFirst refs={refs} />}
      {bottomSheet === "secondArtist" && <StarBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} />}
    </>
  );
};

export default StarInput;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import GiftTag from "@/components/Tag/GiftTag/GiftTag";
import { useStore } from "@/store/index";

const SNS_TYPE_LIST = ["트위터", "인스타그램", "유튜브", "기타"];
const GIFT_LIST = ["컵홀더", "포토카드", "엽서", "티켓", "포스터", "스티커", "굿즈", "기타"];

const SubInfo = () => {
  const { info, setInfo, setStep } = useStore((state) => ({ info: state.postInfo, setInfo: state.setPostInfo, setStep: state.setStep }));
  const [snsType, setSnsType] = useState("");
  const [giftList, setGiftList] = useState<string[]>([]);
  const { register, getValues } = useForm({ mode: "onBlur" });

  const handleRadioChange = (event: any) => {
    setSnsType(event.target.value);
  };

  const handleGiftClick = (gift: any) => {
    if (giftList.includes(gift)) return setGiftList((prev) => prev.filter((item) => item !== gift));
    setGiftList((prev) => [...prev, gift]);
  };

  const saveSubInfo = () => {
    setInfo({ ...info, sns_id: getValues("sns_id"), sns_type: snsType, event_url: getValues("event_url"), gift: giftList });
    setStep(4);
  };

  return (
    <>
      <div>주최자와 특전 정보를 추가해주세요🎁</div>
      <div>*선택 입력 사항입니다.</div>
      <label>
        주최자
        <input placeholder="SNS 아이디 입력" {...register("sns_id")} />
        {SNS_TYPE_LIST.map((type) => (
          <label key={type}>
            <input name="sns" value={type} type="radio" onChange={handleRadioChange} />
            {type}
          </label>
        ))}
      </label>
      <br />
      <label>
        행사 링크
        <input placeholder="URL 입력" {...register("event_url")} />
      </label>
      <br />
      <label>
        특전
        {GIFT_LIST.map((gift) => (
          <GiftTag key={gift} handleClick={handleGiftClick}>
            {gift}
          </GiftTag>
        ))}
      </label>
      <br />
      <button onClick={saveSubInfo}>다음으로</button>
    </>
  );
};

export default SubInfo;

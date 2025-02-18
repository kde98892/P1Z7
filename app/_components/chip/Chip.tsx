type ColorEvent = keyof typeof COLOR_EVENT;
type ColorGoods = keyof typeof COLOR_GOODS;
type Label<T> = T extends "event" ? ColorEvent : ColorGoods;
type Kind = "event" | "goods";
type Theme<T> = T extends "event" ? "light" : "light" | "dark";
interface Props<T> {
  label: Label<T>;
  kind: T;
  theme?: Theme<T>;
}

const Chip = <T extends Kind>({ label, kind, theme = "light" }: Props<T>) => {
  const colorStyle = () => {
    if (kind === "event") {
      return COLOR_EVENT[label as ColorEvent];
    }
    if (theme === "light") {
      return COLOR_GOODS[label as ColorGoods];
    }
    return COLOR_DARK[label as ColorGoods];
  };

  return (
    <div className={`flex-center h-[2.2rem] w-max flex-shrink-0 rounded-lg px-8 pc:h-24 ${colorStyle()}`}>
      <span className="text-12 font-600 pc:text-14">{label}</span>
    </div>
  );
};
export default Chip;

const textWhite = "text-white-white";
const blackBG = "bg-gray-700 text-gray-50";
const grayBG = "bg-gray-50 text-gray-700";
const COLOR_EVENT = {
  카페: `bg-sub-pink ${textWhite}`,
  꽃집: `bg-sub-yellow ${textWhite}`,
  팬광고: `bg-sub-skyblue ${textWhite}`,
  포토부스: `bg-sub-blue ${textWhite}`,
  상영회: `bg-sub-purple ${textWhite}`,
  기타: `bg-sub-red ${textWhite}`,
};
const COLOR_GOODS = {
  "컵/컵홀더": `bg-sub-pink-bg text-sub-pink`,
  포스터: `bg-sub-scarlet-bg text-sub-scarlet`,
  스티커: `bg-sub-yellow-bg text-sub-yellow`,
  키링: `bg-sub-green-bg text-sub-green`,
  포토카드: `bg-sub-skyblue-bg text-sub-skyblue`,
  엽서: `bg-sub-blue-bg text-sub-blue`,
  포토굿즈: `bg-sub-purple-bg text-sub-purple`,
  기타: `bg-gray-50 text-gray-700`,
};

const COLOR_DARK = {
  "컵/컵홀더": blackBG,
  포스터: grayBG,
  스티커: blackBG,
  키링: grayBG,
  포토카드: blackBG,
  엽서: blackBG,
  포토굿즈: grayBG,
  기타: grayBG,
};

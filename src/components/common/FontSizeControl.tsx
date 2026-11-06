import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/Store";
import { setFontSize, type FontSizeLevel } from "@/store/slice/FontSizeSlice";
import "@/styles/FontSizeControl.scss";

const OPTIONS: { level: FontSizeLevel; label: string; symbol: string }[] = [
  { level: "small", label: "Nhỏ", symbol: "A" },
  { level: "medium", label: "Vừa", symbol: "A" },
  { level: "large", label: "To", symbol: "A" },
];

export function FontSizeControl() {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.fontSize.level);

  return (
    <div className="font-size-control" role="group" aria-label="Chỉnh cỡ chữ">
      <span className="font-size-control__label">Cỡ chữ:</span>
      <div className="font-size-control__buttons">
        {OPTIONS.map((opt, index) => (
          <button
            key={opt.level}
            type="button"
            className={`font-size-control__btn font-size-control__btn--${opt.level} ${
              current === opt.level ? "font-size-control__btn--active" : ""
            }`}
            onClick={() => dispatch(setFontSize(opt.level))}
            aria-pressed={current === opt.level}
            aria-label={`Cỡ chữ ${opt.label}`}
            style={{ fontSize: `${12 + index * 2}px` }}
          >
            {opt.symbol}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FontSizeControl;

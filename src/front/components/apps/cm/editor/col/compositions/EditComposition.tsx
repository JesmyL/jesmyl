import EvaIcon from "../../../../../../complect/eva-icon/EvaIcon";
import useExer from "../../../../../../complect/exer/useExer";
import { NavigationThrowNodeProps } from "../../../../../../complect/nav-configurer/Navigation.model";
import useCmNav from "../../../base/useCmNav";
import { cmExer } from "../../../Cm.store";
import { editCompositionNavs } from "../../editorNav";
import PhaseCmEditorContainer from "../../phase-editor-container/PhaseCmEditorContainer";
import "./EditComposition.scss";
import { useEditableCcom } from "./useEditableCcom";

export default function EditComposition({
  outletContent,
  relativePoint,
  currentChildPhase,
}: NavigationThrowNodeProps) {
  const ccom = useEditableCcom();
  const { goTo } = useCmNav();
  const { exec } = useExer(cmExer);

  if (!ccom) return null;

  return (
    <PhaseCmEditorContainer
      topClass="edit-composition"
      headClass="flex between"
      headTitle={`Песня - ${ccom.initialName || ccom.name}`}
      content={
        ccom.col.removed ? (
          <div className="flex column">
            <h2 className="error-message">Песня удалена</h2>
            <div className="pointer" onClick={() => exec(ccom.comeBack())}>
              Восстановить
            </div>
          </div>
        ) : (
          <>
            <div className="flex around margin-gap">
              {editCompositionNavs.map(
                ({
                  data: { icon, iconText } = {},
                  phase: [phase],
                  accessRule,
                }) => {
                  if (accessRule && !cmExer.actionAccessedOrNull(accessRule))
                    return null;
                  return (
                    <span
                      key={`editCompositionNavs ${phase}`}
                      className="pointer"
                      onClick={() =>
                        goTo(phase, relativePoint, ccom.isCreated)
                      }
                    >
                      {icon ? (
                        <EvaIcon
                          name={
                            `${icon}${phase === currentChildPhase ? "" : "-outline"
                            }` as never
                          }
                        />
                      ) : (
                        iconText
                      )}
                    </span>
                  );
                }
              )}
            </div>
            {outletContent}
          </>
        )
      }
    />
  );
}
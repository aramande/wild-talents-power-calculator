import React, { useEffect, useState } from 'react';
import { IPowerItem, IPowerModifier } from '../../interfaces/power.interface';
import { getDescription } from '../../helpers/get-description';
import { Modifiers, getDisplayCost } from '../../helpers/get-modifiers';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import style from './modifierpickermodal.module.scss';
import { Button, Modal } from 'react-bootstrap';

interface ModifierPickerModalProps {
  onClose(): void;
  onSave(modifier: IPowerModifier): void;
  show: boolean | undefined;
  initialData: IPowerModifier;
}

const ModifierPickerModal: React.FC<ModifierPickerModalProps> = (props: ModifierPickerModalProps) => {
  const [description, setDescription] = useState<string[]>([]);
  const [multiplier, setMultiplier] = useState(1);
  const [specific, setSpecific] = useState<string>('');
  const [cost, setCost] = useState(1);
  const [exampleModifier, setExampleModifierState] = useState<IPowerModifier>(Modifiers.extra[0]);
  const [filter, setFilter] = useState<string>('');
  const [focusFilter, setFocusFilter] = useState<boolean>(false);
  const editMode = props.initialData.name.length > 0;

  useEffect(() => {
    const data = props.initialData;
    setExampleModifier(data);
    setCost(data.cost);
    setMultiplier(data.multiplier);
    setSpecific(data.specific);
  }, [props.initialData]);

  function addModifier(formData: FormData) {
    const name = formData.get('name')?.toString() ?? 'Custom';
    const modifier: IPowerModifier = {
      ref: props.initialData.ref,
      name: name,
      specific: specific,
      cost: cost,
      multiplier: multiplier,
    };
    props.onSave(modifier);
  }
  function setExampleModifier(modifier: IPowerItem) {
    setCost(modifier.cost);
    setDescription(getDescription(modifier.name));
    setExampleModifierState(modifier);
  }
  
  function shouldShow(item: IPowerModifier): boolean {
    if (!focusFilter && item.focus) return false;
    if (filter.length > 0 && item.name.toLowerCase().indexOf(filter) < 0) return false;
    return true;
  }

  function onClose(){
    props.onClose();
  }


  return (
    <Modal
      show={props.show}
      onHide={() => props.onClose()}>
      <Modal.Dialog>
        <form
          onSubmit={(e) => {
            addModifier(new FormData(e.currentTarget));
            e.preventDefault();
          }}
        >
        <Modal.Header closeButton>
          <Modal.Title>
            Pick a Modifier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <section className={`${style.editor} ${editMode ? style.editMode : ''}`}>
          <div className={style.creation}>
            <table className="form">
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <h3 className="form__header">Extras/Flaws</h3>
                  </td>
                </tr>
                <tr>
                  <th className="form__label">Name</th>
                  <td className="form__value">
                    <input type="text" name="name" value={exampleModifier.name} readOnly={true} />
                  </td>
                </tr>
                <tr>
                  <th className="form__label">Note</th>
                  <td className="form__value">
                    <input type="text" name="specific" value={specific} onChange={(e) => setSpecific(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <th className="form__label">Cost</th>
                  <td className="form__value">
                    <input type="number" name="cost" value={cost} onChange={(e) => setCost(parseInt(e.target.value))} />
                  </td>
                </tr>
                <tr>
                  <th className="form__label">Times applied</th>
                  <td className="form__value form__row">
                    <button
                      type="button"
                      className="btn btn--transparent btn--small"
                      onClick={() => setMultiplier((x) => (x > 2 ? x - 1 : 1))}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    {multiplier}
                    <button
                      type="button"
                      className="btn btn--transparent btn--small"
                      onClick={() => setMultiplier((x) => x + 1)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {!editMode && (
            <aside className={style.examples}>
              <div className={style.pair}>
                <div>
                  <label htmlFor="filter">Filter</label>{' '}
                  <input type="text" id="filter" value={filter} onChange={(e) => setFilter(e.target.value.toLowerCase())} />
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="focusFilter"
                    checked={focusFilter}
                    onChange={(e) => setFocusFilter(e.target.checked)}
                  />{' '}
                  <label htmlFor="focusFilter">Show Focus Extras/Flaws</label>
                </div>
              </div>

              <div className={`${style.pair} ${style.scrollarea}`}>
                <div className={`${style.extras} btnlist`}>
                  {Modifiers.extra
                    .filter((x) => shouldShow(x))
                    .map((x) => (
                      <button
                        key={x.ref}
                        type="button"
                        className={(exampleModifier.name === x.name ? 'active ' : '') + 'btnlist__btn'}
                        onClick={() => setExampleModifier(x)}
                      >
                        {x.name}
                        {x.focus ? <sup>F</sup> : ''} ({getDisplayCost(x)})
                      </button>
                    ))}
                </div>
                <div className={`${style.flaws} btnlist`}>
                  {Modifiers.flaws
                    .filter((x) => shouldShow(x))
                    .map((x) => (
                      <button
                        key={x.ref}
                        type="button"
                        className={(exampleModifier.name === x.name ? 'active ' : '') + 'btnlist__btn'}
                        onClick={() => setExampleModifier(x)}
                      >
                        {x.name}
                        {x.focus ? <sup>F</sup> : ''} ({getDisplayCost(x)})
                      </button>
                    ))}
                </div>
              </div>
              {focusFilter ? (
                <small>
                  <sup>F</sup> Only available for Focuses
                </small>
              ) : (
                <small></small>
              )}
            </aside>
          )}
          <div className={`${style.description}`}>
            {description.map((x, i) => (
              <ReactMarkdown key={i}>{x}</ReactMarkdown>
            ))}
          </div>
        </section>
        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>Cancel</Button>
        <Button type='submit' variant="primary" className='btn--primary'>
          {editMode ? 'Edit' : 'Add'}
        </Button>
      </Modal.Footer>
    
    </form>
  </Modal.Dialog>
</Modal>
  );
};

export default ModifierPickerModal;

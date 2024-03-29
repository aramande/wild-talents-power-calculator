import React, { useEffect, useRef, useState } from 'react';
import PowerQuality from '../PowerQuality/powerquality';
import { IPowerItem, IPowerQuality } from '../../interfaces/power.interface';
import AddPowerQualityModal from '../../modals/add-power-quality.modal';
import useModal from '../../hooks/useModal';
import EditPowerQualityModal from '../../modals/edit-power-quality.modal';
import ConfirmModal from '../../modals/confirm.modal';
import { Button } from 'react-bootstrap';
import QualityHelper from '../../helpers/Quality.helper';
import { Power } from '../../hooks/usePowerList';
import { ReactTags, Tag, TagSuggestion } from 'react-tag-autocomplete';
import styles from './powerform.module.scss';
import { PowerDef } from '../../App';

interface PowerFormProps {
  desc?: string;
  data?: PowerDef;
  tagSuggestions: TagSuggestion[];
  showInfo: (info: IPowerItem) => void;
  onSavePower: (name: string, power: Power) => void;
}

const PowerForm: React.FC<PowerFormProps> = (props: PowerFormProps) => {
  const [name, setName] = useState<string>('Undefined Power');
  const [tags, setTags] = useState<Tag[]>([]);
  const [desc, setDesc] = useState<string>('');
  const [dirty, setDirty] = useState<boolean>(false);
  const [powerQualities, setPowerQualities] = useState<IPowerQuality[]>([]);
  const [editTarget, setEditTarget] = useState<IPowerQuality | undefined>(undefined);
  const [addQualityModalOpen, toggleAddQualityModal] = useModal();
  const [editQualityModalOpen, toggleEditQualityModal] = useModal();
  const [unsavedChangesModalOpen, toggleUnsavedChangesModal ] = useModal();

  useEffect(() => {
    if(dirty){
      window.onbeforeunload = function() {
        return true;
      };
    }
    else{
      window.onbeforeunload = null;
    }
    return () => {
      window.onbeforeunload = null;
    };
  
  }, [dirty]);

  const toOverwrite = useRef<PowerFormProps|undefined>();
  useEffect(() => {
    const data = props.data;
    if (dirty) {
      toOverwrite.current = props
      toggleUnsavedChangesModal(true);
    }
    else {
      if (props.desc) setDesc(props.desc);
      if (data) {
        setName(data.name);
        setPowerQualities(data.power.qualities);
        setTags(data.power.tags);
        setDesc(data.power.desc ?? '');
      }
    }
  }, [props.data, props.desc]);

  function overwriteChanges(){
    toggleUnsavedChangesModal(false);
    if (!toOverwrite.current) return;
    const prop = toOverwrite.current;
    const data = prop.data;
    if (prop.desc) setDesc(prop.desc);
    if (data) {
      setName(data?.name);
      setPowerQualities(data.power.qualities);
      setTags(data.power.tags);
      setDesc(data.power.desc ?? '');
    }
    toOverwrite.current = undefined;
    setDirty(false);
  }

  function closeAddQualityModal() {
    toggleAddQualityModal(false);
  }
  function closeEditQualityModal() {
    toggleEditQualityModal(false);
  }
  function editQuality(quality: IPowerQuality) {
    setEditTarget(quality);
    toggleEditQualityModal(true);
  }

  const totalCost = powerQualities.reduce(
    (total: number, item: IPowerQuality) => total + QualityHelper.calculateCost(item),
    0
  );

  function saveNewQuality(result: IPowerQuality): void {
    let identifier = result.specific;
    if (!result.specific || result.specific === '') {
      identifier = Math.trunc(Math.random() * 100000).toString();
    }
    result.ref = result.name + identifier;
    setDirty(true);
    setPowerQualities((qualities) => [...qualities, result]);
  }
  function deleteQuality(ref: string): void {
    setDirty(true);
    setPowerQualities((qualities) => qualities.filter((x) => x.ref !== ref));
  }

  function saveEditedQuality(result: IPowerQuality): void {
    setDirty(true);
    setPowerQualities((qualities) => qualities.map((x) => (x.ref === result.ref ? result : x)));
  }
  function savePower(): void {
    const power = new Power(powerQualities, tags, desc);
    props.onSavePower(name, power);
    setDirty(false);
  }
  function clearPower(): void {
    toOverwrite.current = {
      data: {
        name: 'Undefined Power', 
        power: {
          qualities: [], 
          tags: [], 
          desc: ''
        }
      },
      desc: '', 
      tagSuggestions: props.tagSuggestions,
      showInfo: props.showInfo,
      onSavePower: props.onSavePower,
    };
    if(dirty) {
      toggleUnsavedChangesModal(true); 
    }
    else{
      overwriteChanges();
    }
  }
  function addTag(tag: Tag) {
    setDirty(true);
    setTags((x) => [...x, tag]);
  }
  function deleteTag(index: number) {
    setDirty(true);
    setTags((x) => {
      const copy = x.slice();
      copy.splice(index, 1);
      return copy;
    });
  }

  return (
    <section className={styles.powerform}>
      <header>
        <h1>
          <input onChange={(e) => setName(e.target.value)} value={name} />
        </h1>
      </header>
      <div className={styles.dicecost}>
        ({totalCost}/{totalCost * 2}/{totalCost * 4})
      </div>
      <textarea 
        placeholder={"Description..."}
        onChange={(e) => setDesc(e.target.value)}
        onInput={() => setDirty(true)}
        value={desc}
        style={{resize: 'vertical'}} />
      
      <ReactTags
        selected={tags}
        suggestions={props.tagSuggestions}
        onAdd={addTag}
        onDelete={deleteTag}
        allowNew={true}
        placeholderText="Enter Tags"
        noOptionsText="Press Enter to add new tag"
      />
      <article className={styles.qualitylist}>
        {powerQualities.map((x) => (
          <div key={x.ref} className="relative">
            <button className={`${styles.edit} btn btn--neutral`} onClick={() => editQuality(x)}>
              <i className="fa-solid fa-edit"></i>
            </button>
            <PowerQuality info={x} showInfo={props.showInfo}></PowerQuality>
          </div>
        ))}
      </article>
      <div>
        <button className={`${styles.add} btn btn--neutral`} onClick={() => toggleAddQualityModal(true)}>
          <i className="fa-solid fa-plus"></i> Add power quality
        </button>
      </div>
      <footer className={styles.btnfooter}>
        <Button className="btn--delete" onClick={() => clearPower()}>
          Clear
        </Button>
        <Button className="btn--primary" onClick={() => savePower()}>
          Save
        </Button>
      </footer>

      <ConfirmModal width={'300px'} show={unsavedChangesModalOpen} header={'Unsaved Changes'} message={['You have unsaved changes in the current power', 'Are you sure you want to overwrite?']} 
        onCancel={() => {toOverwrite.current = undefined;toggleUnsavedChangesModal(false);}} 
        onConfirm={() => overwriteChanges()} />
      <AddPowerQualityModal show={addQualityModalOpen} onClose={closeAddQualityModal} onSave={saveNewQuality} />
      <EditPowerQualityModal
        show={editQualityModalOpen}
        initialData={editTarget}
        onClose={closeEditQualityModal}
        onDelete={deleteQuality}
        onSave={saveEditedQuality}
      />
    </section>
  );
};

export default PowerForm;

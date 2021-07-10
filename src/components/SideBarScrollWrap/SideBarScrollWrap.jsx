import s from './SideBarScrollWrap.module.scss';

const SideBarScrollWrap = ({ children }) => (
  <div className={s.SideBarScrollWrap}>{children}</div>
);

export default SideBarScrollWrap;

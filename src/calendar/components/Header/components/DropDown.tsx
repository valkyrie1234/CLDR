import { List, ListItem } from '../styles';
import { DropDownProps } from '../types';

const DropDown = ({ isMobile, handleSelectionChange }: DropDownProps) => {

  return (
    <List isMobile={isMobile}>
      <ListItem isMobile={isMobile} onClick={() => handleSelectionChange('current-week')}>
        Текущая неделя
      </ListItem>
      <ListItem isMobile={isMobile} onClick={() => handleSelectionChange('current-month')}>
        Текущий месяц
      </ListItem>
      <ListItem isMobile={isMobile} onClick={() => handleSelectionChange('current-quarter')}>
        Текущий квартал
      </ListItem>
      <ListItem isMobile={isMobile} onClick={() => handleSelectionChange('current-year')}>
        Текущий год
      </ListItem>
    </List>
  );
};

export default DropDown;

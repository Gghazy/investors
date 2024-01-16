import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { fade } from 'src/app/shared/animation/app.animation';

@Component({
  selector: 'app-customs-items-update-form',
  templateUrl: './customs-items-update-form.component.html',
  styleUrls: ['./customs-items-update-form.component.scss'],
  animations: [
    fade
  ]
})
export class CustomsItemsUpdateFormComponent {
  dropdownList : any []= [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  selectedItems3 = [];
  selectedItems4 = [];
  dropdownSettings!: IDropdownSettings;
  
  ngOnInit() {
    this.dropdownList  = [
      { item_id: 1, item_text: ' المنتج 1 (رقم البند الجمركي على مستوى 12 )' },
      { item_id: 2, item_text: ' المنتج 2 (رقم البند الجمركي على مستوى 12 )' },
      { item_id: 3, item_text: ' المنتج 3 (رقم البند الجمركي على مستوى 12 )' },
      
    ];
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'تحديد الكل',
      unSelectAllText: 'ازالة التحديد',
      searchPlaceholderText:'بحث',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    //console.log(item);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }

  handleCheckboxChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const closestTr = (event.target as HTMLInputElement).closest('tr');

    if (closestTr) {
      const showInputTd = closestTr.querySelector('.show-input');

      if (showInputTd) {
        showInputTd.classList.toggle('d-none', !isChecked);

        if (!isChecked) {
          closestTr.querySelector('.checked-item')?.classList.remove('checked-item');
        }
      }
    }
  }
}

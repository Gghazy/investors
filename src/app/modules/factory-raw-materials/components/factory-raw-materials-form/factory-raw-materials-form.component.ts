import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { fade } from 'src/app/shared/animation/app.animation';

@Component({
  selector: 'app-factory-raw-materials-form',
  templateUrl: './factory-raw-materials-form.component.html',
  styleUrls: ['./factory-raw-materials-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryRawMaterialsFormComponent implements OnInit{

  factoryId:any;

  constructor(private route: ActivatedRoute){
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }
  handleUploadClick(event: Event) {
    const targetButton = event.target as HTMLButtonElement;
    const closestDiv = targetButton.closest('div');

    if (closestDiv) {
      const fileInput = closestDiv.querySelectorAll('input')[0];

      if (fileInput) {
        fileInput.click();
      }
    }
  }

  showInput = false;

  handleSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.showInput = selectedValue === 'yes';
  }


  dropdownList : any []= [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  
  dropdownSettings!: IDropdownSettings;
  
  ngOnInit() {
    this.dropdownList  = [
      { item_id: 1, item_text: ' المنتج 1 ' },
      { item_id: 2, item_text: ' المنتج 2 ' },
      { item_id: 3, item_text: ' المنتج 3 ' },
      
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
}

import { Injectable } from '@angular/core';
import { DoublyLinkedNavList } from '../navigation/NavigationListClass'

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navigationList: DoublyLinkedNavList<String>

  constructor() {
    this.navigationList = new DoublyLinkedNavList<string>();
  }

  addCurrentPageToNavList(pageRout: string) {
    this.navigationList.append(pageRout);
  }

  goToPrevPage(currentPageRout: string) {
    const prevPageRout = this.navigationList.findPrev(currentPageRout)?.value;
    return prevPageRout;
  }
}

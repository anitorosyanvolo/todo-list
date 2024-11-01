import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'To Do List'`, () => {
    expect(component.title).toEqual('To Do List');
  });

  it('should render add to do button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Add To Do');
  });
  it('should render input field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input')).toBeTruthy();
  });
  it('should render list', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ul')).toBeTruthy();
  });
  it('should activate button if text is filled', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    expect(button.disabled).toBeTruthy();
    const input = compiled.querySelector('input');
    input.value = 'some text';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(button.disabled).toBeFalsy();
  });
  it('should add item on button click', () => {
    const compiled = fixture.nativeElement;
    const itemsLength = component.list.length;
    const nodLength = compiled.querySelectorAll('ul li').length;
    component.addToDo('test');
    fixture.detectChanges();
    const addedItem = component.items[itemsLength +1];
    const nodes = compiled.querySelectorAll('ul li');
    expect(addedItem.id).toBe(itemsLength+1);
    expect(addedItem.isComplete).toBeFalsy();
    expect(component.list.length).toBe(itemsLength + 1);
    expect(nodes).toBe(nodLength+1);
    expect(nodes[nodLength+1].querySelector('span .title').textContent.toContain('test'));
  });
  it('should delete item on button click', () => {
    const compiled = fixture.nativeElement;
    const itemsLength = component.list.length;
    const nodLength = compiled.querySelectorAll('ul li').length;
    component.deleteTodo();
    fixture.detectChanges();
    expect(component.list.length).toBe(itemsLength - 1);
    expect(compiled.querySelectorAll('ul li')).toBe(nodLength - 1);
  });
  it('should call delete on button click', () => {
    const compiled = fixture.nativeElement;
    const deleteSpy = spyOn(component, 'deleteTodo');
    compiled.querySelector('ul li').nativeElement.querySelector('button').triggerEventHandler('click', null);
    expect(deleteSpy).toHaveBeenCalled();
  });
  it('should call add on button click', () => {
    const compiled = fixture.nativeElement;
    const addSpy = spyOn(component, 'addToDo');
    compiled.querySelector('button').triggerEventHandler('click', null);;
    expect(addSpy).toHaveBeenCalled();
  });
  it('should call mark as complete on checkbox click', () => {
    const compiled = fixture.nativeElement;
    const markAsCompleteSpy = spyOn(component, 'markAsComplete');
    compiled.querySelector('ul li').nativeElement.querySelector('input').triggerEventHandler('click', null);
    expect(markAsCompleteSpy).toHaveBeenCalled();
  });
  it('should mark as complete on checkbox click', () => {
    const compiled = fixture.nativeElement;
    component.items.push({
      id: 1,
      title: 'test',
      isComplete: false,
    })
    component.markAsComplete(1);
    fixture.detectChanges();
    expect(component.items.find((item) => item.id === 1)?.isComplete).toBeTruthy();
    component.markAsComplete(1);
    expect(component.items.find((item) => item.id === 1)?.isComplete).toBeFalsy();
  });
});

# [Volt React Dashboard Bootstrap 5](https://demo.themesberg.com/volt-react-dashboard) with interactive guide 

[Folder with all interactive guide files](src/interactive%20guide)

## Using
1) Place components inside InteractiveGuideWrapper.
```javascript
<InteractiveGuideWrapper>
    //Components
</InteractiveGuideWrapper>
```
2) In wrapped components, get a function from useInteractiveGuide.
```javascript
const setInteractiveGuide = useInteractiveGuide();
```
3) Then put the function in the ref of the component you want to describe.
   
   If you are using a custom component, make sure it has a forwardRef that will point the ref to a standard DOM element.
```javascript
<Component ref={(ref)=>setInteractiveGuide(ref, descriptionObject)} />
```
4) descriptionObject has properties:
* id (Number) - position in the prompt queue
* message (String) - prompt text
* fixed (Boolean) - CSS position: fixed or absolute
* position ( "right" | "left" | "top" | "bottom" ) - default position, it can be changed on resize
* tag (String) - after the end of the guide, completed tags will not be shown again

Example:
```javascript
const descriptionObject = {
    id: 0,
    message: "Here you can see all statistics",
    fixed: true,
    position: "right",
    tag: "sidebar"
}
```
## Screenshots
![Screenshot](https://firebasestorage.googleapis.com/v0/b/todolist-d62a2.appspot.com/o/Screenshot%204.png?alt=media&token=48679a41-dff6-47ff-8c9c-bc1e94ea88eb)
![Screenshot](https://firebasestorage.googleapis.com/v0/b/todolist-d62a2.appspot.com/o/Screenshot%205.png?alt=media&token=2a8e5b4d-6ad0-475b-900b-33ec8469e16a)
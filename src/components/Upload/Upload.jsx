import { Form } from "react-router-dom";

const Upload = ({onChange,...rest}) => {
    const handleFile = (file)=>{
      const fileReader = new FileReader();
      fileReader.onloadend = (event) => {
        onChange({ filename: file.name, content: event.target.result });
      };
      fileReader.readAsArrayBuffer(file);
    };

    const onValueChange = (e)=>{
      const file = e.target.files[0];
      handleFile(file);
    };

    const onDrag = (e)=>{
      e.stopPropagation();
      e.preventDefault();

      var dt = e.dataTransfer;
      var files = dt.files;

      handleFile(files[0]);
    };
    
    return (
        <div>
            <Form id="upload">
              <input
                id="file"
                className="upload"
                type="file"
                name="file"
                accept=".fit"
                onChange={onValueChange}
                onDrag={onDrag}
                {...rest}
              />
            </Form>
        </div>
    )
}

export default Upload;

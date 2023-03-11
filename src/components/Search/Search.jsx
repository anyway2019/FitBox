import { Form, useNavigation, useSubmit } from "react-router-dom";

const SearchBar = ({data}) => {
    const submit = useSubmit();
    const navigation = useNavigation();
    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");
    const onValueChange = (e)=>{
        const isFirstSearch = data == null;
        submit(e.currentTarget.form,{replace:!isFirstSearch})
    };
    
    return (
        <>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching?"searching":""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                value={data}
                onChange={onValueChange}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
        </>
    )
}

export default SearchBar;

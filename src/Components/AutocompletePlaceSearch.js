import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux";
import Input from "./Input"
import { addressInputAction } from '../redux/actions/addressInputAction'

const AutocompletePlaceSearch = ({setAddress, inputError, inputErrorText }) => {
  const [query, setQuery] = useState('')
  const autoCompleteRef = useRef(null)
  let autoComplete = useRef(null)

  const loadScript = (url, callback) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'

    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = () => callback()
    }

    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  useEffect(() => {
    const handlePlaceSelect = (updateQuery) => {
      const addressObject = autoComplete.current.getPlace()
      const query = addressObject.formatted_address
      updateQuery(query)
      setAddress(addressObject.formatted_address)
    }

    const handleScriptLoad = (updateQuery, autoCompleteRef) => {
      autoComplete.current = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current
      )
      autoComplete.current.setFields(['address_components', 'formatted_address'])
      autoComplete.current.addListener('place_changed', () =>
        handlePlaceSelect(updateQuery)
      )
    }
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyAVHb6w_UX7PUKwEamNcR-6wU-VRkJhVY0&libraries=places`,
        () => handleScriptLoad(setQuery, autoCompleteRef)
      )
  }, [setAddress])

  const handleInputValue = value => {
    setQuery(value)
  }

  return (
    <div>
      <Input
        id='autocompleteInput'
        label='Address'
        ref={autoCompleteRef}
        onChange={e => handleInputValue(e)}
        value={query}
        error={inputError}
        errorText={inputErrorText}
      />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setAddress: str => dispatch(addressInputAction(str))
})

export default connect(null, mapDispatchToProps)(AutocompletePlaceSearch)
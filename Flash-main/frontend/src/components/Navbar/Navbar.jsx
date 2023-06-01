import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect,useState } from "react"
import Cookie from 'js-cookie'
import Popup from '../../components/Popup/Popup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import IndividualTrainee from '../../pages/IndividualTrainee/IndividualTrainee';
import CorporateTrainee from '../../pages/CorporateTrainee/CorporateTrainee';
import SearchCourses from '../../pages/SearchCourses/SearchCourses';
const handleLogOut=()=>{
  const response =  fetch ('/login/logout')
  console.log(response.json)
  window.location.href="/"

}
var isCountryChosen=false



function Navbar1() {
  const [isGuest,setIsGuest] = useState(null)
  const [isInst,setisInst] = useState(false)
  const [isTrainee,setisTrainee] = useState(false)
  const [isITrainee,setisITrainee] = useState(false)
  const [isCTrainee,setisCTrainee] = useState(false)
  const [isAdmin,setisAdmin] = useState(false)

  const [userId,setUserId]=useState(null)

  const [myCountry, setMyCountry] = useState("United States")
  const [isOpen, setIsOpen] = useState(false);
  const [flag, setFlag] =  useState("https://flagsapi.com/US/shiny/64.png")
  const [search,setSearch] = useState('');

var codes=[{"name":"Israel","dial_code":"+972","code":"IL"},{"name":"Afghanistan","dial_code":"+93","code":"AF"},{"name":"Albania","dial_code":"+355","code":"AL"},{"name":"Algeria","dial_code":"+213","code":"DZ"},{"name":"AmericanSamoa","dial_code":"+1 684","code":"AS"},{"name":"Andorra","dial_code":"+376","code":"AD"},{"name":"Angola","dial_code":"+244","code":"AO"},{"name":"Anguilla","dial_code":"+1 264","code":"AI"},{"name":"Antigua and Barbuda","dial_code":"+1268","code":"AG"},{"name":"Argentina","dial_code":"+54","code":"AR"},{"name":"Armenia","dial_code":"+374","code":"AM"},{"name":"Aruba","dial_code":"+297","code":"AW"},{"name":"Australia","dial_code":"+61","code":"AU"},{"name":"Austria","dial_code":"+43","code":"AT"},{"name":"Azerbaijan","dial_code":"+994","code":"AZ"},{"name":"Bahamas","dial_code":"+1 242","code":"BS"},{"name":"Bahrain","dial_code":"+973","code":"BH"},{"name":"Bangladesh","dial_code":"+880","code":"BD"},{"name":"Barbados","dial_code":"+1 246","code":"BB"},{"name":"Belarus","dial_code":"+375","code":"BY"},{"name":"Belgium","dial_code":"+32","code":"BE"},{"name":"Belize","dial_code":"+501","code":"BZ"},{"name":"Benin","dial_code":"+229","code":"BJ"},{"name":"Bermuda","dial_code":"+1 441","code":"BM"},{"name":"Bhutan","dial_code":"+975","code":"BT"},{"name":"Bosnia and Herzegovina","dial_code":"+387","code":"BA"},{"name":"Botswana","dial_code":"+267","code":"BW"},{"name":"Brazil","dial_code":"+55","code":"BR"},{"name":"British Indian Ocean Territory","dial_code":"+246","code":"IO"},{"name":"Bulgaria","dial_code":"+359","code":"BG"},{"name":"Burkina Faso","dial_code":"+226","code":"BF"},{"name":"Burundi","dial_code":"+257","code":"BI"},{"name":"Cambodia","dial_code":"+855","code":"KH"},{"name":"Cameroon","dial_code":"+237","code":"CM"},{"name":"Canada","dial_code":"+1","code":"CA"},{"name":"Cape Verde","dial_code":"+238","code":"CV"},{"name":"Cayman Islands","dial_code":"+ 345","code":"KY"},{"name":"Central African Republic","dial_code":"+236","code":"CF"},{"name":"Chad","dial_code":"+235","code":"TD"},{"name":"Chile","dial_code":"+56","code":"CL"},{"name":"China","dial_code":"+86","code":"CN"},{"name":"Christmas Island","dial_code":"+61","code":"CX"},{"name":"Colombia","dial_code":"+57","code":"CO"},{"name":"Comoros","dial_code":"+269","code":"KM"},{"name":"Congo","dial_code":"+242","code":"CG"},{"name":"Cook Islands","dial_code":"+682","code":"CK"},{"name":"Costa Rica","dial_code":"+506","code":"CR"},{"name":"Croatia","dial_code":"+385","code":"HR"},{"name":"Cuba","dial_code":"+53","code":"CU"},{"name":"Cyprus","dial_code":"+537","code":"CY"},{"name":"Czech Republic","dial_code":"+420","code":"CZ"},{"name":"Denmark","dial_code":"+45","code":"DK"},{"name":"Djibouti","dial_code":"+253","code":"DJ"},{"name":"Dominica","dial_code":"+1 767","code":"DM"},{"name":"Dominican Republic","dial_code":"+1 849","code":"DO"},{"name":"Ecuador","dial_code":"+593","code":"EC"},{"name":"Egypt","dial_code":"+20","code":"EG"},{"name":"El Salvador","dial_code":"+503","code":"SV"},{"name":"Equatorial Guinea","dial_code":"+240","code":"GQ"},{"name":"Eritrea","dial_code":"+291","code":"ER"},{"name":"Estonia","dial_code":"+372","code":"EE"},{"name":"Ethiopia","dial_code":"+251","code":"ET"},{"name":"Faroe Islands","dial_code":"+298","code":"FO"},{"name":"Fiji","dial_code":"+679","code":"FJ"},{"name":"Finland","dial_code":"+358","code":"FI"},{"name":"France","dial_code":"+33","code":"FR"},{"name":"French Guiana","dial_code":"+594","code":"GF"},{"name":"French Polynesia","dial_code":"+689","code":"PF"},{"name":"Gabon","dial_code":"+241","code":"GA"},{"name":"Gambia","dial_code":"+220","code":"GM"},{"name":"Georgia","dial_code":"+995","code":"GE"},{"name":"Germany","dial_code":"+49","code":"DE"},{"name":"Ghana","dial_code":"+233","code":"GH"},{"name":"Gibraltar","dial_code":"+350","code":"GI"},{"name":"Greece","dial_code":"+30","code":"GR"},{"name":"Greenland","dial_code":"+299","code":"GL"},{"name":"Grenada","dial_code":"+1 473","code":"GD"},{"name":"Guadeloupe","dial_code":"+590","code":"GP"},{"name":"Guam","dial_code":"+1 671","code":"GU"},{"name":"Guatemala","dial_code":"+502","code":"GT"},{"name":"Guinea","dial_code":"+224","code":"GN"},{"name":"Guinea-Bissau","dial_code":"+245","code":"GW"},{"name":"Guyana","dial_code":"+595","code":"GY"},{"name":"Haiti","dial_code":"+509","code":"HT"},{"name":"Honduras","dial_code":"+504","code":"HN"},{"name":"Hungary","dial_code":"+36","code":"HU"},{"name":"Iceland","dial_code":"+354","code":"IS"},{"name":"India","dial_code":"+91","code":"IN"},{"name":"Indonesia","dial_code":"+62","code":"ID"},{"name":"Iraq","dial_code":"+964","code":"IQ"},{"name":"Ireland","dial_code":"+353","code":"IE"},{"name":"Israel","dial_code":"+972","code":"IL"},{"name":"Italy","dial_code":"+39","code":"IT"},{"name":"Jamaica","dial_code":"+1 876","code":"JM"},{"name":"Japan","dial_code":"+81","code":"JP"},{"name":"Jordan","dial_code":"+962","code":"JO"},{"name":"Kazakhstan","dial_code":"+7 7","code":"KZ"},{"name":"Kenya","dial_code":"+254","code":"KE"},{"name":"Kiribati","dial_code":"+686","code":"KI"},{"name":"Kuwait","dial_code":"+965","code":"KW"},{"name":"Kyrgyzstan","dial_code":"+996","code":"KG"},{"name":"Latvia","dial_code":"+371","code":"LV"},{"name":"Lebanon","dial_code":"+961","code":"LB"},{"name":"Lesotho","dial_code":"+266","code":"LS"},{"name":"Liberia","dial_code":"+231","code":"LR"},{"name":"Liechtenstein","dial_code":"+423","code":"LI"},{"name":"Lithuania","dial_code":"+370","code":"LT"},{"name":"Luxembourg","dial_code":"+352","code":"LU"},{"name":"Madagascar","dial_code":"+261","code":"MG"},{"name":"Malawi","dial_code":"+265","code":"MW"},{"name":"Malaysia","dial_code":"+60","code":"MY"},{"name":"Maldives","dial_code":"+960","code":"MV"},{"name":"Mali","dial_code":"+223","code":"ML"},{"name":"Malta","dial_code":"+356","code":"MT"},{"name":"Marshall Islands","dial_code":"+692","code":"MH"},{"name":"Martinique","dial_code":"+596","code":"MQ"},{"name":"Mauritania","dial_code":"+222","code":"MR"},{"name":"Mauritius","dial_code":"+230","code":"MU"},{"name":"Mayotte","dial_code":"+262","code":"YT"},{"name":"Mexico","dial_code":"+52","code":"MX"},{"name":"Monaco","dial_code":"+377","code":"MC"},{"name":"Mongolia","dial_code":"+976","code":"MN"},{"name":"Montenegro","dial_code":"+382","code":"ME"},{"name":"Montserrat","dial_code":"+1664","code":"MS"},{"name":"Morocco","dial_code":"+212","code":"MA"},{"name":"Myanmar","dial_code":"+95","code":"MM"},{"name":"Namibia","dial_code":"+264","code":"NA"},{"name":"Nauru","dial_code":"+674","code":"NR"},{"name":"Nepal","dial_code":"+977","code":"NP"},{"name":"Netherlands","dial_code":"+31","code":"NL"},{"name":"Netherlands Antilles","dial_code":"+599","code":"AN"},{"name":"New Caledonia","dial_code":"+687","code":"NC"},{"name":"New Zealand","dial_code":"+64","code":"NZ"},{"name":"Nicaragua","dial_code":"+505","code":"NI"},{"name":"Niger","dial_code":"+227","code":"NE"},{"name":"Nigeria","dial_code":"+234","code":"NG"},{"name":"Niue","dial_code":"+683","code":"NU"},{"name":"Norfolk Island","dial_code":"+672","code":"NF"},{"name":"Northern Mariana Islands","dial_code":"+1 670","code":"MP"},{"name":"Norway","dial_code":"+47","code":"NO"},{"name":"Oman","dial_code":"+968","code":"OM"},{"name":"Pakistan","dial_code":"+92","code":"PK"},{"name":"Palau","dial_code":"+680","code":"PW"},{"name":"Panama","dial_code":"+507","code":"PA"},{"name":"Papua New Guinea","dial_code":"+675","code":"PG"},{"name":"Paraguay","dial_code":"+595","code":"PY"},{"name":"Peru","dial_code":"+51","code":"PE"},{"name":"Philippines","dial_code":"+63","code":"PH"},{"name":"Poland","dial_code":"+48","code":"PL"},{"name":"Portugal","dial_code":"+351","code":"PT"},{"name":"Puerto Rico","dial_code":"+1 939","code":"PR"},{"name":"Qatar","dial_code":"+974","code":"QA"},{"name":"Romania","dial_code":"+40","code":"RO"},{"name":"Rwanda","dial_code":"+250","code":"RW"},{"name":"Samoa","dial_code":"+685","code":"WS"},{"name":"San Marino","dial_code":"+378","code":"SM"},{"name":"Saudi Arabia","dial_code":"+966","code":"SA"},{"name":"Senegal","dial_code":"+221","code":"SN"},{"name":"Serbia","dial_code":"+381","code":"RS"},{"name":"Seychelles","dial_code":"+248","code":"SC"},{"name":"Sierra Leone","dial_code":"+232","code":"SL"},{"name":"Singapore","dial_code":"+65","code":"SG"},{"name":"Slovakia","dial_code":"+421","code":"SK"},{"name":"Slovenia","dial_code":"+386","code":"SI"},{"name":"Solomon Islands","dial_code":"+677","code":"SB"},{"name":"South Africa","dial_code":"+27","code":"ZA"},{"name":"South Georgia and the South Sandwich Islands","dial_code":"+500","code":"GS"},{"name":"Spain","dial_code":"+34","code":"ES"},{"name":"Sri Lanka","dial_code":"+94","code":"LK"},{"name":"Sudan","dial_code":"+249","code":"SD"},{"name":"Suriname","dial_code":"+597","code":"SR"},{"name":"Swaziland","dial_code":"+268","code":"SZ"},{"name":"Sweden","dial_code":"+46","code":"SE"},{"name":"Switzerland","dial_code":"+41","code":"CH"},{"name":"Tajikistan","dial_code":"+992","code":"TJ"},{"name":"Thailand","dial_code":"+66","code":"TH"},{"name":"Togo","dial_code":"+228","code":"TG"},{"name":"Tokelau","dial_code":"+690","code":"TK"},{"name":"Tonga","dial_code":"+676","code":"TO"},{"name":"Trinidad and Tobago","dial_code":"+1 868","code":"TT"},{"name":"Tunisia","dial_code":"+216","code":"TN"},{"name":"Turkey","dial_code":"+90","code":"TR"},{"name":"Turkmenistan","dial_code":"+993","code":"TM"},{"name":"Turks and Caicos Islands","dial_code":"+1 649","code":"TC"},{"name":"Tuvalu","dial_code":"+688","code":"TV"},{"name":"Uganda","dial_code":"+256","code":"UG"},{"name":"Ukraine","dial_code":"+380","code":"UA"},{"name":"United Arab Emirates","dial_code":"+971","code":"AE"},{"name":"United Kingdom","dial_code":"+44","code":"GB"},{"name":"United States","dial_code":"+1","code":"US"},{"name":"Uruguay","dial_code":"+598","code":"UY"},{"name":"Uzbekistan","dial_code":"+998","code":"UZ"},{"name":"Vanuatu","dial_code":"+678","code":"VU"},{"name":"Wallis and Futuna","dial_code":"+681","code":"WF"},{"name":"Yemen","dial_code":"+967","code":"YE"},{"name":"Zambia","dial_code":"+260","code":"ZM"},{"name":"Zimbabwe","dial_code":"+263","code":"ZW"},{"name":"land Islands","dial_code":"","code":"AX"},{"name":"Antarctica","dial_code":null,"code":"AQ"},{"name":"Bolivia, Plurinational State of","dial_code":"+591","code":"BO"},{"name":"Brunei Darussalam","dial_code":"+673","code":"BN"},{"name":"Cocos (Keeling) Islands","dial_code":"+61","code":"CC"},{"name":"Congo, The Democratic Republic of the","dial_code":"+243","code":"CD"},{"name":"Cote d'Ivoire","dial_code":"+225","code":"CI"},{"name":"Falkland Islands (Malvinas)","dial_code":"+500","code":"FK"},{"name":"Guernsey","dial_code":"+44","code":"GG"},{"name":"Holy See (Vatican City State)","dial_code":"+379","code":"VA"},{"name":"Hong Kong","dial_code":"+852","code":"HK"},{"name":"Iran, Islamic Republic of","dial_code":"+98","code":"IR"},{"name":"Isle of Man","dial_code":"+44","code":"IM"},{"name":"Jersey","dial_code":"+44","code":"JE"},{"name":"Korea, Democratic People's Republic of","dial_code":"+850","code":"KP"},{"name":"Korea, Republic of","dial_code":"+82","code":"KR"},{"name":"Lao People's Democratic Republic","dial_code":"+856","code":"LA"},{"name":"Libyan Arab Jamahiriya","dial_code":"+218","code":"LY"},{"name":"Macao","dial_code":"+853","code":"MO"},{"name":"Macedonia, The Former Yugoslav Republic of","dial_code":"+389","code":"MK"},{"name":"Micronesia, Federated States of","dial_code":"+691","code":"FM"},{"name":"Moldova, Republic of","dial_code":"+373","code":"MD"},{"name":"Mozambique","dial_code":"+258","code":"MZ"},{"name":"Palestinian Territory, Occupied","dial_code":"+970","code":"PS"},{"name":"Pitcairn","dial_code":"+872","code":"PN"},{"name":"Réunion","dial_code":"+262","code":"RE"},{"name":"Russia","dial_code":"+7","code":"RU"},{"name":"Saint Barthélemy","dial_code":"+590","code":"BL"},{"name":"Saint Helena, Ascension and Tristan Da Cunha","dial_code":"+290","code":"SH"},{"name":"Saint Kitts and Nevis","dial_code":"+1 869","code":"KN"},{"name":"Saint Lucia","dial_code":"+1 758","code":"LC"},{"name":"Saint Martin","dial_code":"+590","code":"MF"},{"name":"Saint Pierre and Miquelon","dial_code":"+508","code":"PM"},{"name":"Saint Vincent and the Grenadines","dial_code":"+1 784","code":"VC"},{"name":"Sao Tome and Principe","dial_code":"+239","code":"ST"},{"name":"Somalia","dial_code":"+252","code":"SO"},{"name":"Svalbard and Jan Mayen","dial_code":"+47","code":"SJ"},{"name":"Syrian Arab Republic","dial_code":"+963","code":"SY"},{"name":"Taiwan, Province of China","dial_code":"+886","code":"TW"},{"name":"Tanzania, United Republic of","dial_code":"+255","code":"TZ"},{"name":"Timor-Leste","dial_code":"+670","code":"TL"},{"name":"Venezuela, Bolivarian Republic of","dial_code":"+58","code":"VE"},{"name":"Viet Nam","dial_code":"+84","code":"VN"},{"name":"Virgin Islands, British","dial_code":"+1 284","code":"VG"},{"name":"Virgin Islands, U.S.","dial_code":"+1 340","code":"VI"}]
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const getCountryCode=( countryName) =>{
    setFlag( "https://flagsapi.com/"+
      codes.find(o=>o.name.match(RegExp(countryName,'i'))).code+"/shiny/64.png");
  }

  const fetchID = async () => {
    const response = await fetch('/login/userId')
    const json = await response.json()

    //console.log(json.id)

    if (response.ok) {
        setUserId(json.id)
    }
}
 
    useEffect(()=>{
       

      
        let role=Cookie.get('role')
        console.log(role)
            if (role === undefined)
                {
                  setIsGuest(true)
                  const fetchCountry = async ()=>{
                    const response = await fetch ('/user/countryG')
                    const json = await response.json()
        
                    console.log("get c"+json)
        
                    if (response.ok )
                    {
                      getCountryCode(json)
                      setMyCountry(json)
                      
                    }
                    
                  }
                  fetchCountry()
                 
                }
              
              else{
                setIsGuest(false)
                fetchID()
                const fetchCountry = async ()=>{
                  const response = await fetch ('/user/country')
                  const json = await response.json()
      
                  console.log("get c"+json.country)

                  if (response.ok)
                  {
                        getCountryCode(json.country)
                        setMyCountry(json.country)

                  }
                }
                fetchCountry()


              }
            if (role === "individualTrainee" || role === "corporateTrainee")
            {
              setisTrainee(true)
            }
            if (role === "instructor" )
            {
              setisInst(true)
            }
            if (role === "individualTrainee" )
            {
              setisITrainee(true)
            }
            if (role === "corporateTrainee" )
            {
              setisCTrainee(true)
            }
            if (role === "administrator" )
            {
              setisAdmin(true)
            }
           

       
       },[])
       const [errorMessage, setErrorMessage] = useState('');

       const setCountry= (e)=>{
           //e.preventDefault()
   
           const response =  fetch("/user/country",
           {
               method:'POST',
               body: JSON.stringify({country: e.target.value}).trim(),
               headers:{
                   'Content-Type':'application/json'
               }
           }).then(function(response){
               const json = response.body.json
               console.log("json response: ",json)  //the console can't read it for some reason it's undefined
           })
          isCountryChosen=true
       }
       const setCountry2= (e)=>{
        //e.preventDefault()

        const response =  fetch("/user/countryGuest",
        {
            method:'POST',
            body: JSON.stringify({country: e.target.value}).trim(),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(function(response){
            const json = response.body.json
            console.log("json response: ",json)  //the console can't read it for some reason it's undefined
        })
       
       isCountryChosen=true
    }
       const goToChooseCountry=(e)=>{
           if(isCountryChosen){
             window.location.reload();
             //setErrorMessage("Country chosen!")
           }
           else{
               setErrorMessage('Please select a country to proceed!');
           }
       }
       const popoverGuest = (
        <Popover id={"popover-positioned-bottom"} >
          <Popover.Header as="h3">Select a country</Popover.Header>
          <Popover.Body>
         
                    <div>
              <select name="country" onChange={setCountry2} id="country" style={{width:"100%"}} >
            
              <option value="" selected disabled hidden>Choose here</option>
                <option value="Afghanistan">Afghanistan</option>
      <option value="Albania">Albania</option>
      <option value="Algeria">Algeria</option>
      <option value="American Samoa">American Samoa</option>
      <option value="Andorra">Andorra</option>
      <option value="Angola">Angola</option>
      <option value="Anguilla">Anguilla</option>
      <option value="Antartica">Antarctica</option>
      <option value="Antigua and Barbuda">Antigua and Barbuda</option>
      <option value="Argentina">Argentina</option>
      <option value="Armenia">Armenia</option>
      <option value="Aruba">Aruba</option>
      <option value="Australia">Australia</option>
      <option value="Austria">Austria</option>
      <option value="Azerbaijan">Azerbaijan</option>
      <option value="Bahamas">Bahamas</option>
      <option value="Bahrain">Bahrain</option>
      <option value="Bangladesh">Bangladesh</option>
      <option value="Barbados">Barbados</option>
      <option value="Belarus">Belarus</option>
      <option value="Belgium">Belgium</option>
      <option value="Belize">Belize</option>
      <option value="Benin">Benin</option>
      <option value="Bermuda">Bermuda</option>
      <option value="Bhutan">Bhutan</option>
      <option value="Bolivia">Bolivia</option>
      <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
      <option value="Botswana">Botswana</option>
      <option value="Bouvet Island">Bouvet Island</option>
      <option value="Brazil">Brazil</option>
      <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
      <option value="Brunei Darussalam">Brunei Darussalam</option>
      <option value="Bulgaria">Bulgaria</option>
      <option value="Burkina Faso">Burkina Faso</option>
      <option value="Burundi">Burundi</option>
      <option value="Cambodia">Cambodia</option>
      <option value="Cameroon">Cameroon</option>
      <option value="Canada">Canada</option>
      <option value="Cape Verde">Cape Verde</option>
      <option value="Cayman Islands">Cayman Islands</option>
      <option value="Central African Republic">Central African Republic</option>
      <option value="Chad">Chad</option>
      <option value="Chile">Chile</option>
      <option value="China">China</option>
      <option value="Christmas Island">Christmas Island</option>
      <option value="Cocos Islands">Cocos (Keeling) Islands</option>
      <option value="Colombia">Colombia</option>
      <option value="Comoros">Comoros</option>
      <option value="Congo">Congo</option>
      <option value="Congo">Congo, the Democratic Republic of the</option>
      <option value="Cook Islands">Cook Islands</option>
      <option value="Costa Rica">Costa Rica</option>
      <option value="Cota D'Ivoire">Cote d'Ivoire</option>
      <option value="Croatia">Croatia (Hrvatska)</option>
      <option value="Cuba">Cuba</option>
      <option value="Cyprus">Cyprus</option>
      <option value="Czech Republic">Czech Republic</option>
      <option value="Denmark">Denmark</option>
      <option value="Djibouti">Djibouti</option>
      <option value="Dominica">Dominica</option>
      <option value="Dominican Republic">Dominican Republic</option>
      <option value="East Timor">East Timor</option>
      <option value="Ecuador">Ecuador</option>
      <option value="Egypt">Egypt</option>
      <option value="El Salvador">El Salvador</option>
      <option value="Equatorial Guinea">Equatorial Guinea</option>
      <option value="Eritrea">Eritrea</option>
      <option value="Estonia">Estonia</option>
      <option value="Ethiopia">Ethiopia</option>
      <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
      <option value="Faroe Islands">Faroe Islands</option>
      <option value="Fiji">Fiji</option>
      <option value="Finland">Finland</option>
      <option value="France">France</option>
      <option value="France Metropolitan">France, Metropolitan</option>
      <option value="French Guiana">French Guiana</option>
      <option value="French Polynesia">French Polynesia</option>
      <option value="French Southern Territories">French Southern Territories</option>
      <option value="Gabon">Gabon</option>
      <option value="Gambia">Gambia</option>
      <option value="Georgia">Georgia</option>
      <option value="Germany">Germany</option>
      <option value="Ghana">Ghana</option>
      <option value="Gibraltar">Gibraltar</option>
      <option value="Greece">Greece</option>
      <option value="Greenland">Greenland</option>
      <option value="Grenada">Grenada</option>
      <option value="Guadeloupe">Guadeloupe</option>
      <option value="Guam">Guam</option>
      <option value="Guatemala">Guatemala</option>
      <option value="Guinea">Guinea</option>
      <option value="Guinea-Bissau">Guinea-Bissau</option>
      <option value="Guyana">Guyana</option>
      <option value="Haiti">Haiti</option>
      <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
      <option value="Holy See">Holy See (Vatican City State)</option>
      <option value="Honduras">Honduras</option>
      <option value="Hong Kong">Hong Kong</option>
      <option value="Hungary">Hungary</option>
      <option value="Iceland">Iceland</option>
      <option value="India">India</option>
      <option value="Indonesia">Indonesia</option>
      <option value="Iran">Iran (Islamic Republic of)</option>
      <option value="Iraq">Iraq</option>
      <option value="Ireland">Ireland</option>
      <option value="Israel">Israel</option>
      <option value="Italy">Italy</option>
      <option value="Jamaica">Jamaica</option>
      <option value="Japan">Japan</option>
      <option value="Jordan">Jordan</option>
      <option value="Kazakhstan">Kazakhstan</option>
      <option value="Kenya">Kenya</option>
      <option value="Kiribati">Kiribati</option>
      <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
      <option value="Korea">Korea, Republic of</option>
      <option value="Kuwait">Kuwait</option>
      <option value="Kyrgyzstan">Kyrgyzstan</option>
      <option value="Lao">Lao People's Democratic Republic</option>
      <option value="Latvia">Latvia</option>
      <option value="Lebanon">Lebanon</option>
      <option value="Lesotho">Lesotho</option>
      <option value="Liberia">Liberia</option>
      <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
      <option value="Liechtenstein">Liechtenstein</option>
      <option value="Lithuania">Lithuania</option>
      <option value="Luxembourg">Luxembourg</option>
      <option value="Macau">Macau</option>
      <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
      <option value="Madagascar">Madagascar</option>
      <option value="Malawi">Malawi</option>
      <option value="Malaysia">Malaysia</option>
      <option value="Maldives">Maldives</option>
      <option value="Mali">Mali</option>
      <option value="Malta">Malta</option>
      <option value="Marshall Islands">Marshall Islands</option>
      <option value="Martinique">Martinique</option>
      <option value="Mauritania">Mauritania</option>
      <option value="Mauritius">Mauritius</option>
      <option value="Mayotte">Mayotte</option>
      <option value="Mexico">Mexico</option>
      <option value="Micronesia">Micronesia, Federated States of</option>
      <option value="Moldova">Moldova, Republic of</option>
      <option value="Monaco">Monaco</option>
      <option value="Mongolia">Mongolia</option>
      <option value="Montserrat">Montserrat</option>
      <option value="Morocco">Morocco</option>
      <option value="Mozambique">Mozambique</option>
      <option value="Myanmar">Myanmar</option>
      <option value="Namibia">Namibia</option>
      <option value="Nauru">Nauru</option>
      <option value="Nepal">Nepal</option>
      <option value="Netherlands">Netherlands</option>
      <option value="Netherlands Antilles">Netherlands Antilles</option>
      <option value="New Caledonia">New Caledonia</option>
      <option value="New Zealand">New Zealand</option>
      <option value="Nicaragua">Nicaragua</option>
      <option value="Niger">Niger</option>
      <option value="Nigeria">Nigeria</option>
      <option value="Niue">Niue</option>
      <option value="Norfolk Island">Norfolk Island</option>
      <option value="Northern Mariana Islands">Northern Mariana Islands</option>
      <option value="Norway">Norway</option>
      <option value="Oman">Oman</option>
      <option value="Pakistan">Pakistan</option>
      <option value="Palau">Palau</option>
      <option value="Panama">Panama</option>
      <option value="Papua New Guinea">Papua New Guinea</option>
      <option value="Paraguay">Paraguay</option>
      <option value="Peru">Peru</option>
      <option value="Philippines">Philippines</option>
      <option value="Pitcairn">Pitcairn</option>
      <option value="Poland">Poland</option>
      <option value="Portugal">Portugal</option>
      <option value="Puerto Rico">Puerto Rico</option>
      <option value="Qatar">Qatar</option>
      <option value="Reunion">Reunion</option>
      <option value="Romania">Romania</option>
      <option value="Russia">Russian Federation</option>
      <option value="Rwanda">Rwanda</option>
      <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
      <option value="Saint LUCIA">Saint LUCIA</option>
      <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
      <option value="Samoa">Samoa</option>
      <option value="San Marino">San Marino</option>
      <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
      <option value="Saudi Arabia">Saudi Arabia</option>
      <option value="Senegal">Senegal</option>
      <option value="Seychelles">Seychelles</option>
      <option value="Sierra">Sierra Leone</option>
      <option value="Singapore">Singapore</option>
      <option value="Slovakia">Slovakia (Slovak Republic)</option>
      <option value="Slovenia">Slovenia</option>
      <option value="Solomon Islands">Solomon Islands</option>
      <option value="Somalia">Somalia</option>
      <option value="South Africa">South Africa</option>
      <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
      <option value="Span">Spain</option>
      <option value="SriLanka">Sri Lanka</option>
      <option value="St. Helena">St. Helena</option>
      <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
      <option value="Sudan">Sudan</option>
      <option value="Suriname">Suriname</option>
      <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
      <option value="Swaziland">Swaziland</option>
      <option value="Sweden">Sweden</option>
      <option value="Switzerland">Switzerland</option>
      <option value="Syria">Syrian Arab Republic</option>
      <option value="Taiwan">Taiwan, Province of China</option>
      <option value="Tajikistan">Tajikistan</option>
      <option value="Tanzania">Tanzania, United Republic of</option>
      <option value="Thailand">Thailand</option>
      <option value="Togo">Togo</option>
      <option value="Tokelau">Tokelau</option>
      <option value="Tonga">Tonga</option>
      <option value="Trinidad and Tobago">Trinidad and Tobago</option>
      <option value="Tunisia">Tunisia</option>
      <option value="Turkey">Turkey</option>
      <option value="Turkmenistan">Turkmenistan</option>
      <option value="Turks and Caicos">Turks and Caicos Islands</option>
      <option value="Tuvalu">Tuvalu</option>
      <option value="Uganda">Uganda</option>
      <option value="Ukraine">Ukraine</option>
      <option value="United Arab Emirates">United Arab Emirates</option>
      <option value="United Kingdom">United Kingdom</option>
      <option value="United States">United States</option>
      <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
      <option value="Uruguay">Uruguay</option>
      <option value="Uzbekistan">Uzbekistan</option>
      <option value="Vanuatu">Vanuatu</option>
      <option value="Venezuela">Venezuela</option>
      <option value="Vietnam">Viet Nam</option>
      <option value="Virgin Islands (British)">Virgin Islands (British)</option>
      <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
      <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
      <option value="Western Sahara">Western Sahara</option>
      <option value="Yemen">Yemen</option>
      <option value="Serbia">Serbia</option>
      <option value="Zambia">Zambia</option>
      <option value="Zimbabwe">Zimbabwe</option>
      </select>
      <div>
      <button style={{marginLeft:"70%",marginTop:"20px",width:"75px",backgroundColor:"#fa7466"}} variant="chooseCountry" className="yaybtn" onClick={goToChooseCountry}>Choose</button>
      {errorMessage && (
        <p className="error"> {errorMessage} </p>
      )}
      </div>
      </div>
      
          </Popover.Body>
        </Popover>
      );
       const popover = (
        <Popover id={"popover-positioned-bottom"} >
          <Popover.Header as="h3">Select a country</Popover.Header>
          <Popover.Body>
         
                    <div>
              <select name="country" onChange={setCountry} id="country" style={{width:"100%"}} >
            
              <option value="" selected disabled hidden>Choose here</option>
                <option value="Afghanistan">Afghanistan</option>
      <option value="Albania">Albania</option>
      <option value="Algeria">Algeria</option>
      <option value="American Samoa">American Samoa</option>
      <option value="Andorra">Andorra</option>
      <option value="Angola">Angola</option>
      <option value="Anguilla">Anguilla</option>
      <option value="Antartica">Antarctica</option>
      <option value="Antigua and Barbuda">Antigua and Barbuda</option>
      <option value="Argentina">Argentina</option>
      <option value="Armenia">Armenia</option>
      <option value="Aruba">Aruba</option>
      <option value="Australia">Australia</option>
      <option value="Austria">Austria</option>
      <option value="Azerbaijan">Azerbaijan</option>
      <option value="Bahamas">Bahamas</option>
      <option value="Bahrain">Bahrain</option>
      <option value="Bangladesh">Bangladesh</option>
      <option value="Barbados">Barbados</option>
      <option value="Belarus">Belarus</option>
      <option value="Belgium">Belgium</option>
      <option value="Belize">Belize</option>
      <option value="Benin">Benin</option>
      <option value="Bermuda">Bermuda</option>
      <option value="Bhutan">Bhutan</option>
      <option value="Bolivia">Bolivia</option>
      <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
      <option value="Botswana">Botswana</option>
      <option value="Bouvet Island">Bouvet Island</option>
      <option value="Brazil">Brazil</option>
      <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
      <option value="Brunei Darussalam">Brunei Darussalam</option>
      <option value="Bulgaria">Bulgaria</option>
      <option value="Burkina Faso">Burkina Faso</option>
      <option value="Burundi">Burundi</option>
      <option value="Cambodia">Cambodia</option>
      <option value="Cameroon">Cameroon</option>
      <option value="Canada">Canada</option>
      <option value="Cape Verde">Cape Verde</option>
      <option value="Cayman Islands">Cayman Islands</option>
      <option value="Central African Republic">Central African Republic</option>
      <option value="Chad">Chad</option>
      <option value="Chile">Chile</option>
      <option value="China">China</option>
      <option value="Christmas Island">Christmas Island</option>
      <option value="Cocos Islands">Cocos (Keeling) Islands</option>
      <option value="Colombia">Colombia</option>
      <option value="Comoros">Comoros</option>
      <option value="Congo">Congo</option>
      <option value="Congo">Congo, the Democratic Republic of the</option>
      <option value="Cook Islands">Cook Islands</option>
      <option value="Costa Rica">Costa Rica</option>
      <option value="Cota D'Ivoire">Cote d'Ivoire</option>
      <option value="Croatia">Croatia (Hrvatska)</option>
      <option value="Cuba">Cuba</option>
      <option value="Cyprus">Cyprus</option>
      <option value="Czech Republic">Czech Republic</option>
      <option value="Denmark">Denmark</option>
      <option value="Djibouti">Djibouti</option>
      <option value="Dominica">Dominica</option>
      <option value="Dominican Republic">Dominican Republic</option>
      <option value="East Timor">East Timor</option>
      <option value="Ecuador">Ecuador</option>
      <option value="Egypt">Egypt</option>
      <option value="El Salvador">El Salvador</option>
      <option value="Equatorial Guinea">Equatorial Guinea</option>
      <option value="Eritrea">Eritrea</option>
      <option value="Estonia">Estonia</option>
      <option value="Ethiopia">Ethiopia</option>
      <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
      <option value="Faroe Islands">Faroe Islands</option>
      <option value="Fiji">Fiji</option>
      <option value="Finland">Finland</option>
      <option value="France">France</option>
      <option value="France Metropolitan">France, Metropolitan</option>
      <option value="French Guiana">French Guiana</option>
      <option value="French Polynesia">French Polynesia</option>
      <option value="French Southern Territories">French Southern Territories</option>
      <option value="Gabon">Gabon</option>
      <option value="Gambia">Gambia</option>
      <option value="Georgia">Georgia</option>
      <option value="Germany">Germany</option>
      <option value="Ghana">Ghana</option>
      <option value="Gibraltar">Gibraltar</option>
      <option value="Greece">Greece</option>
      <option value="Greenland">Greenland</option>
      <option value="Grenada">Grenada</option>
      <option value="Guadeloupe">Guadeloupe</option>
      <option value="Guam">Guam</option>
      <option value="Guatemala">Guatemala</option>
      <option value="Guinea">Guinea</option>
      <option value="Guinea-Bissau">Guinea-Bissau</option>
      <option value="Guyana">Guyana</option>
      <option value="Haiti">Haiti</option>
      <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
      <option value="Holy See">Holy See (Vatican City State)</option>
      <option value="Honduras">Honduras</option>
      <option value="Hong Kong">Hong Kong</option>
      <option value="Hungary">Hungary</option>
      <option value="Iceland">Iceland</option>
      <option value="India">India</option>
      <option value="Indonesia">Indonesia</option>
      <option value="Iran">Iran (Islamic Republic of)</option>
      <option value="Iraq">Iraq</option>
      <option value="Ireland">Ireland</option>
      <option value="Israel">Israel</option>
      <option value="Italy">Italy</option>
      <option value="Jamaica">Jamaica</option>
      <option value="Japan">Japan</option>
      <option value="Jordan">Jordan</option>
      <option value="Kazakhstan">Kazakhstan</option>
      <option value="Kenya">Kenya</option>
      <option value="Kiribati">Kiribati</option>
      <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
      <option value="Korea">Korea, Republic of</option>
      <option value="Kuwait">Kuwait</option>
      <option value="Kyrgyzstan">Kyrgyzstan</option>
      <option value="Lao">Lao People's Democratic Republic</option>
      <option value="Latvia">Latvia</option>
      <option value="Lebanon">Lebanon</option>
      <option value="Lesotho">Lesotho</option>
      <option value="Liberia">Liberia</option>
      <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
      <option value="Liechtenstein">Liechtenstein</option>
      <option value="Lithuania">Lithuania</option>
      <option value="Luxembourg">Luxembourg</option>
      <option value="Macau">Macau</option>
      <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
      <option value="Madagascar">Madagascar</option>
      <option value="Malawi">Malawi</option>
      <option value="Malaysia">Malaysia</option>
      <option value="Maldives">Maldives</option>
      <option value="Mali">Mali</option>
      <option value="Malta">Malta</option>
      <option value="Marshall Islands">Marshall Islands</option>
      <option value="Martinique">Martinique</option>
      <option value="Mauritania">Mauritania</option>
      <option value="Mauritius">Mauritius</option>
      <option value="Mayotte">Mayotte</option>
      <option value="Mexico">Mexico</option>
      <option value="Micronesia">Micronesia, Federated States of</option>
      <option value="Moldova">Moldova, Republic of</option>
      <option value="Monaco">Monaco</option>
      <option value="Mongolia">Mongolia</option>
      <option value="Montserrat">Montserrat</option>
      <option value="Morocco">Morocco</option>
      <option value="Mozambique">Mozambique</option>
      <option value="Myanmar">Myanmar</option>
      <option value="Namibia">Namibia</option>
      <option value="Nauru">Nauru</option>
      <option value="Nepal">Nepal</option>
      <option value="Netherlands">Netherlands</option>
      <option value="Netherlands Antilles">Netherlands Antilles</option>
      <option value="New Caledonia">New Caledonia</option>
      <option value="New Zealand">New Zealand</option>
      <option value="Nicaragua">Nicaragua</option>
      <option value="Niger">Niger</option>
      <option value="Nigeria">Nigeria</option>
      <option value="Niue">Niue</option>
      <option value="Norfolk Island">Norfolk Island</option>
      <option value="Northern Mariana Islands">Northern Mariana Islands</option>
      <option value="Norway">Norway</option>
      <option value="Oman">Oman</option>
      <option value="Pakistan">Pakistan</option>
      <option value="Palau">Palau</option>
      <option value="Panama">Panama</option>
      <option value="Papua New Guinea">Papua New Guinea</option>
      <option value="Paraguay">Paraguay</option>
      <option value="Peru">Peru</option>
      <option value="Philippines">Philippines</option>
      <option value="Pitcairn">Pitcairn</option>
      <option value="Poland">Poland</option>
      <option value="Portugal">Portugal</option>
      <option value="Puerto Rico">Puerto Rico</option>
      <option value="Qatar">Qatar</option>
      <option value="Reunion">Reunion</option>
      <option value="Romania">Romania</option>
      <option value="Russia">Russian Federation</option>
      <option value="Rwanda">Rwanda</option>
      <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
      <option value="Saint LUCIA">Saint LUCIA</option>
      <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
      <option value="Samoa">Samoa</option>
      <option value="San Marino">San Marino</option>
      <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
      <option value="Saudi Arabia">Saudi Arabia</option>
      <option value="Senegal">Senegal</option>
      <option value="Seychelles">Seychelles</option>
      <option value="Sierra">Sierra Leone</option>
      <option value="Singapore">Singapore</option>
      <option value="Slovakia">Slovakia (Slovak Republic)</option>
      <option value="Slovenia">Slovenia</option>
      <option value="Solomon Islands">Solomon Islands</option>
      <option value="Somalia">Somalia</option>
      <option value="South Africa">South Africa</option>
      <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
      <option value="Span">Spain</option>
      <option value="SriLanka">Sri Lanka</option>
      <option value="St. Helena">St. Helena</option>
      <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
      <option value="Sudan">Sudan</option>
      <option value="Suriname">Suriname</option>
      <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
      <option value="Swaziland">Swaziland</option>
      <option value="Sweden">Sweden</option>
      <option value="Switzerland">Switzerland</option>
      <option value="Syria">Syrian Arab Republic</option>
      <option value="Taiwan">Taiwan, Province of China</option>
      <option value="Tajikistan">Tajikistan</option>
      <option value="Tanzania">Tanzania, United Republic of</option>
      <option value="Thailand">Thailand</option>
      <option value="Togo">Togo</option>
      <option value="Tokelau">Tokelau</option>
      <option value="Tonga">Tonga</option>
      <option value="Trinidad and Tobago">Trinidad and Tobago</option>
      <option value="Tunisia">Tunisia</option>
      <option value="Turkey">Turkey</option>
      <option value="Turkmenistan">Turkmenistan</option>
      <option value="Turks and Caicos">Turks and Caicos Islands</option>
      <option value="Tuvalu">Tuvalu</option>
      <option value="Uganda">Uganda</option>
      <option value="Ukraine">Ukraine</option>
      <option value="United Arab Emirates">United Arab Emirates</option>
      <option value="United Kingdom">United Kingdom</option>
      <option value="United States">United States</option>
      <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
      <option value="Uruguay">Uruguay</option>
      <option value="Uzbekistan">Uzbekistan</option>
      <option value="Vanuatu">Vanuatu</option>
      <option value="Venezuela">Venezuela</option>
      <option value="Vietnam">Viet Nam</option>
      <option value="Virgin Islands (British)">Virgin Islands (British)</option>
      <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
      <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
      <option value="Western Sahara">Western Sahara</option>
      <option value="Yemen">Yemen</option>
      <option value="Serbia">Serbia</option>
      <option value="Zambia">Zambia</option>
      <option value="Zimbabwe">Zimbabwe</option>
      </select>
      <div>
       
      <button style={{marginLeft:"70%",marginTop:"20px",width:"75px",backgroundColor:"#fa7466"}} variant="chooseCountry" className="yaybtn" onClick={goToChooseCountry}>Choose</button>
      {errorMessage && (
        <p className="error"> {errorMessage} </p>
      )}
      </div>
      </div>
      
          </Popover.Body>
        </Popover>
      );


      const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
      };

      const goToCourses = async (e)=>{
        window.location.href='/courses/search?search='+search;      
      }

      const goToCoursesGuest = async (e)=>{
        window.location.href='/courses/search/guest?search='+search;      
      }
    
  return (
    <div>
     
<div>
    <Navbar className="nav"  expand="lg"  >
      <Container fluid             style={{ maxHeight: '120px'}} >
      {isGuest&&  <Navbar.Brand href="/"><img width="20%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO2Xz08TQRTHlwZ7IF4Em+60xbhV6MH0YNSrPUA5qelMQyLe9GJgZ6t/APg/mHiggZNHg0eMJ41GUzxwkUSq8h+YiLVE2AXyNUMa3G2X/tiOaUnmk3yTZi9933nvzXujaQqFQqFQKBSKnlAguGASWFzHa1NH2STYOZKOsvjGCfhsDKNav/EwgTgnKHKCA06AZjIJDjnBi0dRXNT6AU6Q4wTVVoHzRiO/zRjudPyH+/n8lMPYkkNp2aZ0x2EMQbWQfAlD+9BUYwMlpAfXkRn6jrvD237ZKLQV+N70dMqm9H03Abv17MoyktrHlgaMOl0Lf8b9yB+PiZaZcHK5jM3Ytqzgv2YLGA+VOg7eqGk8tIZ7IxVvOY0idvLJSwxeiJ17Fzh4w2XCnQmuY8nXgE3pW5nBb04WApWOcUI5uXriwIoj4W1YSrMygxeab6NxjQ4042psMwrTW/uULss2MHE2eO0bPsoMbbmzsFpvoCzbwNUzn6QaSA+u/8uAjnJ9/VdlGxD3ukwDlwdK7gxU/7+BLq5Pw0fiQFzXaeW0l9Cm14BYGU5zE+8zNinbwEJyRaqBmZFfxwbmdMz6DbI3Mg18m5I3yK6HN9z1v98wyAS7jCVtxn7INMGGu18lUqE1PIjsug0s+q4StV64aTP2U1oWsryrZS7VuMxVHp8H0Zqxx9iYzL1oMV0MVEo3whv1J39oxXC7afCexs7nJxxKiw5jX7qdE08urbQ1qNJHD5otT8MevwUILK2XiMeI2OcDPCkrZhS3tH7A0hExdTwVN0mbj/rnLWu+F1hxJMRKbBK8ElO19tiv1n6vch1zvlelQqFQKBQKhUIT/AXmEZdqwgtsqAAAAABJRU5ErkJggg=="/>  O N C L I CK</Navbar.Brand>}
      {!isGuest&& isITrainee && <Navbar.Brand href={"/individualTrainee/"+userId}><img width="20%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO2Xz08TQRTHlwZ7IF4Em+60xbhV6MH0YNSrPUA5qelMQyLe9GJgZ6t/APg/mHiggZNHg0eMJ41GUzxwkUSq8h+YiLVE2AXyNUMa3G2X/tiOaUnmk3yTZi9933nvzXujaQqFQqFQKBSKnlAguGASWFzHa1NH2STYOZKOsvjGCfhsDKNav/EwgTgnKHKCA06AZjIJDjnBi0dRXNT6AU6Q4wTVVoHzRiO/zRjudPyH+/n8lMPYkkNp2aZ0x2EMQbWQfAlD+9BUYwMlpAfXkRn6jrvD237ZKLQV+N70dMqm9H03Abv17MoyktrHlgaMOl0Lf8b9yB+PiZaZcHK5jM3Ytqzgv2YLGA+VOg7eqGk8tIZ7IxVvOY0idvLJSwxeiJ17Fzh4w2XCnQmuY8nXgE3pW5nBb04WApWOcUI5uXriwIoj4W1YSrMygxeab6NxjQ4042psMwrTW/uULss2MHE2eO0bPsoMbbmzsFpvoCzbwNUzn6QaSA+u/8uAjnJ9/VdlGxD3ukwDlwdK7gxU/7+BLq5Pw0fiQFzXaeW0l9Cm14BYGU5zE+8zNinbwEJyRaqBmZFfxwbmdMz6DbI3Mg18m5I3yK6HN9z1v98wyAS7jCVtxn7INMGGu18lUqE1PIjsug0s+q4StV64aTP2U1oWsryrZS7VuMxVHp8H0Zqxx9iYzL1oMV0MVEo3whv1J39oxXC7afCexs7nJxxKiw5jX7qdE08urbQ1qNJHD5otT8MevwUILK2XiMeI2OcDPCkrZhS3tH7A0hExdTwVN0mbj/rnLWu+F1hxJMRKbBK8ElO19tiv1n6vch1zvlelQqFQKBQKhUIT/AXmEZdqwgtsqAAAAABJRU5ErkJggg=="/>  O N C L I CK</Navbar.Brand>}
      {!isGuest&& isCTrainee && <Navbar.Brand href={"/corporateTrainee/"+userId}><img width="20%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO2Xz08TQRTHlwZ7IF4Em+60xbhV6MH0YNSrPUA5qelMQyLe9GJgZ6t/APg/mHiggZNHg0eMJ41GUzxwkUSq8h+YiLVE2AXyNUMa3G2X/tiOaUnmk3yTZi9933nvzXujaQqFQqFQKBSKnlAguGASWFzHa1NH2STYOZKOsvjGCfhsDKNav/EwgTgnKHKCA06AZjIJDjnBi0dRXNT6AU6Q4wTVVoHzRiO/zRjudPyH+/n8lMPYkkNp2aZ0x2EMQbWQfAlD+9BUYwMlpAfXkRn6jrvD237ZKLQV+N70dMqm9H03Abv17MoyktrHlgaMOl0Lf8b9yB+PiZaZcHK5jM3Ytqzgv2YLGA+VOg7eqGk8tIZ7IxVvOY0idvLJSwxeiJ17Fzh4w2XCnQmuY8nXgE3pW5nBb04WApWOcUI5uXriwIoj4W1YSrMygxeab6NxjQ4042psMwrTW/uULss2MHE2eO0bPsoMbbmzsFpvoCzbwNUzn6QaSA+u/8uAjnJ9/VdlGxD3ukwDlwdK7gxU/7+BLq5Pw0fiQFzXaeW0l9Cm14BYGU5zE+8zNinbwEJyRaqBmZFfxwbmdMz6DbI3Mg18m5I3yK6HN9z1v98wyAS7jCVtxn7INMGGu18lUqE1PIjsug0s+q4StV64aTP2U1oWsryrZS7VuMxVHp8H0Zqxx9iYzL1oMV0MVEo3whv1J39oxXC7afCexs7nJxxKiw5jX7qdE08urbQ1qNJHD5otT8MevwUILK2XiMeI2OcDPCkrZhS3tH7A0hExdTwVN0mbj/rnLWu+F1hxJMRKbBK8ElO19tiv1n6vch1zvlelQqFQKBQKhUIT/AXmEZdqwgtsqAAAAABJRU5ErkJggg=="/>  O N C L I CK</Navbar.Brand>}
      {!isGuest&& isInst && <Navbar.Brand href={"/instructor/"+userId}><img width="20%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO2Xz08TQRTHlwZ7IF4Em+60xbhV6MH0YNSrPUA5qelMQyLe9GJgZ6t/APg/mHiggZNHg0eMJ41GUzxwkUSq8h+YiLVE2AXyNUMa3G2X/tiOaUnmk3yTZi9933nvzXujaQqFQqFQKBSKnlAguGASWFzHa1NH2STYOZKOsvjGCfhsDKNav/EwgTgnKHKCA06AZjIJDjnBi0dRXNT6AU6Q4wTVVoHzRiO/zRjudPyH+/n8lMPYkkNp2aZ0x2EMQbWQfAlD+9BUYwMlpAfXkRn6jrvD237ZKLQV+N70dMqm9H03Abv17MoyktrHlgaMOl0Lf8b9yB+PiZaZcHK5jM3Ytqzgv2YLGA+VOg7eqGk8tIZ7IxVvOY0idvLJSwxeiJ17Fzh4w2XCnQmuY8nXgE3pW5nBb04WApWOcUI5uXriwIoj4W1YSrMygxeab6NxjQ4042psMwrTW/uULss2MHE2eO0bPsoMbbmzsFpvoCzbwNUzn6QaSA+u/8uAjnJ9/VdlGxD3ukwDlwdK7gxU/7+BLq5Pw0fiQFzXaeW0l9Cm14BYGU5zE+8zNinbwEJyRaqBmZFfxwbmdMz6DbI3Mg18m5I3yK6HN9z1v98wyAS7jCVtxn7INMGGu18lUqE1PIjsug0s+q4StV64aTP2U1oWsryrZS7VuMxVHp8H0Zqxx9iYzL1oMV0MVEo3whv1J39oxXC7afCexs7nJxxKiw5jX7qdE08urbQ1qNJHD5otT8MevwUILK2XiMeI2OcDPCkrZhS3tH7A0hExdTwVN0mbj/rnLWu+F1hxJMRKbBK8ElO19tiv1n6vch1zvlelQqFQKBQKhUIT/AXmEZdqwgtsqAAAAABJRU5ErkJggg=="/>  O N C L I CK</Navbar.Brand>}
      {!isGuest&&  !isITrainee && !isCTrainee && !isInst && <Navbar.Brand href={"/administrator/"+userId}><img width="20%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO2Xz08TQRTHlwZ7IF4Em+60xbhV6MH0YNSrPUA5qelMQyLe9GJgZ6t/APg/mHiggZNHg0eMJ41GUzxwkUSq8h+YiLVE2AXyNUMa3G2X/tiOaUnmk3yTZi9933nvzXujaQqFQqFQKBSKnlAguGASWFzHa1NH2STYOZKOsvjGCfhsDKNav/EwgTgnKHKCA06AZjIJDjnBi0dRXNT6AU6Q4wTVVoHzRiO/zRjudPyH+/n8lMPYkkNp2aZ0x2EMQbWQfAlD+9BUYwMlpAfXkRn6jrvD237ZKLQV+N70dMqm9H03Abv17MoyktrHlgaMOl0Lf8b9yB+PiZaZcHK5jM3Ytqzgv2YLGA+VOg7eqGk8tIZ7IxVvOY0idvLJSwxeiJ17Fzh4w2XCnQmuY8nXgE3pW5nBb04WApWOcUI5uXriwIoj4W1YSrMygxeab6NxjQ4042psMwrTW/uULss2MHE2eO0bPsoMbbmzsFpvoCzbwNUzn6QaSA+u/8uAjnJ9/VdlGxD3ukwDlwdK7gxU/7+BLq5Pw0fiQFzXaeW0l9Cm14BYGU5zE+8zNinbwEJyRaqBmZFfxwbmdMz6DbI3Mg18m5I3yK6HN9z1v98wyAS7jCVtxn7INMGGu18lUqE1PIjsug0s+q4StV64aTP2U1oWsryrZS7VuMxVHp8H0Zqxx9iYzL1oMV0MVEo3whv1J39oxXC7afCexs7nJxxKiw5jX7qdE08urbQ1qNJHD5otT8MevwUILK2XiMeI2OcDPCkrZhS3tH7A0hExdTwVN0mbj/rnLWu+F1hxJMRKbBK8ElO19tiv1n6vch1zvlelQqFQKBQKhUIT/AXmEZdqwgtsqAAAAABJRU5ErkJggg=="/>  O N C L I CK</Navbar.Brand>}

       
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

        {!isAdmin&&  <Form className="d-flex">
            <input
              type="text"
              placeholder="  Search for courses"
              className="me-2"
              aria-label="Search"
              style={{ width:'750px',borderRadius:'25px',borderColor:'black'}}
              onChange={handleChange}
              value={search}
            />

           {!isGuest && <Button className="generalbutton" style={{ width:'125px' ,borderRadius:'25px'} } onClick={goToCourses} >
              Search
            </Button>}
            {isGuest && <Button className="generalbutton" style={{ width:'125px' ,borderRadius:'25px'} } onClick={goToCoursesGuest} >
              Search
            </Button>}
          </Form>}
         
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           {isGuest&& 
             <OverlayTrigger trigger="click" placement="bottom" overlay={popoverGuest}>
            <Nav.Link onClick={togglePopup} style={{  fontSize:'18px' ,marginLeft:"40px"}}> <img width="30px" src={flag}/></Nav.Link>
  </OverlayTrigger>}
  {!isGuest &&  !isAdmin&& <Nav.Link  href={"/courses/"+userId} style={{   color:'#2f3cbc',fontSize:'18px',marginLeft:"30px",marginRight:"-55px"}}>  All courses</Nav.Link>}
  {isGuest && <Nav.Link  href={"/guest/courses"} style={{   color:'#2f3cbc',fontSize:'18px',marginLeft:"10px"}}>  All courses</Nav.Link>}

          {isGuest&&  <Nav.Link href="/Login" style={{ color:'#647cd6', fontSize:'18px' ,marginLeft:"5px"}}>Login<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAy0lEQVR4nGNgGAWUAp+U3Ud9U/f8Jwmn7DlMtAW+pBoOxSRbwEAj9Qw0twAV/Gf0yN3Gx0ArC3xSd3f4puy5Hpi2XZLqFvglHeH1Sd19EWrA5cCMnWJUtQAEvDMPC/qm7j4DTYpYfYLXAlKTok/KntO0tSB1z3GSLCAEfJP3iPuk7L4KCaLdF3zS9otQzYLQrP08Pqm7b8AMD8jeLYzVERT5IHVPGS6XU8UCEAgtPMbJMKSKCl96WeBLs+I6Zc9h0i3YfYhoCxhGPAAA6gtUOhPa4lkAAAAASUVORK5CYII="></img></Nav.Link>}
          {isGuest&& <Nav.Link href="/Signup" style={{  color:"white",backgroundColor:'#fa7465',fontSize:'18px',marginLeft:"10px",borderStyle:"solid",borderRadius:"5px",borderWidth:"1px" }}>Join Us</Nav.Link> }
         
          { ( isTrainee ||   isInst) && <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Nav.Link onClick={togglePopup} style={{  fontSize:'18px' ,marginLeft:"70px"}}> <img width="30px" src={flag}/></Nav.Link>
  </OverlayTrigger>}
      {!isGuest && !isAdmin && <img height="40px" style={{  marginRight:"-15px",marginLeft:"10px"  }} src="data:image/png;base64,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"></img>}
          {!isGuest && !isAdmin && <NavDropdown  id="basic-nav-dropdown" >
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              {
                isInst && <NavDropdown.Item href="/instructor/myCourses">
                My Courses
               </NavDropdown.Item>
              }
              {isITrainee && <NavDropdown.Item href={"/individualTrainee/myCourses/"+userId}>
               My Courses
              </NavDropdown.Item>
              }
               {isITrainee && <NavDropdown.Item href={"/wallet/"+userId}>
               My Refund Requests
              </NavDropdown.Item>
              }
              {isCTrainee && <NavDropdown.Item href={"/corporateTrainee/myCourses/"+userId}>
               My Courses
              </NavDropdown.Item>}
              {isCTrainee && <NavDropdown.Item href={"/corporateTrainee/courseRequests"}>
               My Course Requests
              </NavDropdown.Item>}

           {   isInst && <NavDropdown.Item href="/instructor/ratingsAndReviews">My Ratings & Reviews</NavDropdown.Item>}
           {  ( isTrainee ||   isInst) &&  <NavDropdown.Divider />}
             
         {isInst &&  <NavDropdown.Item  href="/instructor/MyReports" style={{  color:"#da5852",fontSize:'18px'}}>My reports & issues</NavDropdown.Item>}
         {isITrainee &&  <NavDropdown.Item  href="/individualTrainee/MyReports" style={{  color:"#da5852",fontSize:'18px'}}>My reports & issues</NavDropdown.Item>}
         {isCTrainee &&  <NavDropdown.Item  href="/corporateTrainee/MyReports" style={{  color:"#da5852",fontSize:'18px'}}>My reports & issues</NavDropdown.Item>}

            </NavDropdown>
            
}
{!isGuest && !isAdmin &&  

<Nav.Link onClick={handleLogOut} style={{ color:'#647cd6', fontSize:'18px', marginLeft:"5px",marginTop:"4px"}}>
                Logout   <img style={{ marginLeft:"10px" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABc0lEQVR4nN2Wu0oDURCG06igjY9g4aMIBolgYTITEezSmZlgYWlKGwsVO5voeyho5/wxMVhZegEVxNgJCsqsJua2JNlEEAcGdouZ75ydy7+xdNbmSHHDio9enRQvpHa4IqXJWDfz5CSoeACpPTclEyuzYosVm41OYnus9sqCg66A4ERieX+Or16NURYJVhR+YPaY1uJ828EEOyyo9gVotBqMFCUWu20HWN5jIwO6JaJ/ByApTZHaHastDgXAYmlSu6i9JzcuR1nshAVvTZCogE6WyGCcBUeseKccliIDkrnidErPZjp5WrBAivv6TaIAKPjWPUy94Olv3iDMltfKE6w49hp4EwzeRYJK0+QrTofWRfTbc0D/blWEWuQiK3YH0oNWAImt112x3bOieeVJcO7i4q0WBuAWTfbkPWmyy6HL4ldgIJOFRhj1MWihlslghHPFOCv2fX9875Fq8CMgqLDgeiBAKywlmHUYiT14codHTfgJDeoKBjyL+WYAAAAASUVORK5CYII="></img>
                </Nav.Link>}

                {!isGuest && isAdmin &&  

<Nav.Link onClick={handleLogOut} style={{ color:'#647cd6', fontSize:'18px', marginLeft:"75vw",marginTop:"4px"}}>
                Logout   <img style={{ marginLeft:"10px" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABc0lEQVR4nN2Wu0oDURCG06igjY9g4aMIBolgYTITEezSmZlgYWlKGwsVO5voeyho5/wxMVhZegEVxNgJCsqsJua2JNlEEAcGdouZ75ydy7+xdNbmSHHDio9enRQvpHa4IqXJWDfz5CSoeACpPTclEyuzYosVm41OYnus9sqCg66A4ERieX+Or16NURYJVhR+YPaY1uJ828EEOyyo9gVotBqMFCUWu20HWN5jIwO6JaJ/ByApTZHaHastDgXAYmlSu6i9JzcuR1nshAVvTZCogE6WyGCcBUeseKccliIDkrnidErPZjp5WrBAivv6TaIAKPjWPUy94Olv3iDMltfKE6w49hp4EwzeRYJK0+QrTofWRfTbc0D/blWEWuQiK3YH0oNWAImt112x3bOieeVJcO7i4q0WBuAWTfbkPWmyy6HL4ldgIJOFRhj1MWihlslghHPFOCv2fX9875Fq8CMgqLDgeiBAKywlmHUYiT14codHTfgJDeoKBjyL+WYAAAAASUVORK5CYII="></img>
                </Nav.Link>}

          
           </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
   
</div>

    
   
    
  );
}

export default Navbar1;
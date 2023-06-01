import React, { useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import AddInstructor from '../AddInstructor/AddInstructor';
import AddAdmin from '../AddAdmin/AddAdmin';
import AddCorporateTrainee from '../AddCorporateTrianee/AddCorporateTrianee';
import ViewReports from '../ViewReports/ViewReports';
import AdminAcceptCourses from '../AdminAcceptCourses/AdminAcceptCourses';
import AdminAddDiscount from '../AdminAddDiscount/AdminAddDiscount';
import AdminRefund from '../AdminRefund/AdminRefund';

export default function AdminHome() {
    const [verticalActive, setVerticalActive] = useState('tab1');
    const godown = () => {
        window.scrollTo(0, 500);
    }
    const goToReports = () => {
        window.location.href = '/reports'
    }
    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }

        setVerticalActive(value);
    };
    return (
        <div style={{ minHeight: "700px" }}>
            <h4>Hello, Admin!</h4>
            <MDBRow style={{ fontSize: "25px" }}>
                <MDBCol size='1'></MDBCol>
                <MDBCol size='1'></MDBCol>
                <MDBCol size='3' style={{ cursor: "pointer", boxShadow: "0px 1px 8px 2px grey" }} className='admin-list'><MDBTabsLink className='flex-column text-center' style={{ marginTop: "20px" }} onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}><img src="https://img.icons8.com/ios-filled/50/null/training.png" /><br></br>Add An Instructor </MDBTabsLink>
                </MDBCol>
                <MDBCol size='3' style={{ cursor: "pointer", boxShadow: "0px 1px 8px 2px grey", marginLeft: "20px", }} className='admin-list'><MDBTabsLink className='flex-column text-center' style={{ marginTop: "20px" }} onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}><img src="https://img.icons8.com/ios-filled/50/null/admin-settings-male.png" /><br></br>Add An Adminstrator </MDBTabsLink>
                </MDBCol>
                <MDBCol size='3' style={{ cursor: "pointer", boxShadow: "0px 1px 8px 2px grey", marginLeft: "20px" }} className='admin-list'><MDBTabsLink className='flex-column text-center' style={{ marginTop: "20px" }} onClick={() => handleVerticalClick('tab4')} active={verticalActive === 'tab4'}><img src="https://img.icons8.com/ios/50/null/teamwork--v1.png" /><br></br>Add a Corporate Trainee </MDBTabsLink>
                </MDBCol>
            </MDBRow>
            <MDBRow style={{ fontSize: "25px" }}>
                <MDBCol size='1'></MDBCol>
                <MDBCol size='1'></MDBCol>

                <MDBCol size='3' style={{ cursor: "pointer", boxShadow: "0px 1px 8px 2px grey", height: "120px" }} className='admin-list'><MDBTabsLink className='flex-column text-center' style={{ marginTop: "20px" }} onClick={() => handleVerticalClick('tab5')} active={verticalActive === 'tab5'}><img src="https://img.icons8.com/ios-filled/50/null/season-sale.png" /><br></br>Add a Course Discount </MDBTabsLink>
                </MDBCol>
                <MDBCol size='3' style={{ cursor: "pointer", boxShadow: "0px 1px 8px 2px grey", marginLeft: "20px" }} className='admin-list'><MDBTabsLink className='flex-column text-center' style={{ marginTop: "20px" }} onClick={() => handleVerticalClick('tab6')} active={verticalActive === 'tab6'}><img style={{ marginTop: "-14px" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACYUlEQVR4nO2WT2sTQRjG53tscuh20p3sn+zsErRQFHvwUCpC8WDSXPQk9iAET4Xize+iBxGFjOBBY3f9Bh6yOSi09eJBlnpVXtmYDTZtk2xKws7O+8BzmMMcnh/vP0JQKBRqgbJN85ltVX9RfeVE1/Utopq4W/tdoRToqg5UXzkiqsn3+L/wQxPV5CMAjhVAsQV0nAEUh6CuxhZgxhrYlgmVYeDCbwE2Fpi7NRgdPkUEwDIGLhwAnjHw+Lv9aO+0rJVgES5pWrBwAH7GwOPv5/sHCwmfOjcA3JpzplJSu7YND5ot2Lh2vdgAPF4D02TnAAwgODbsP2nLCYCPzYDL3rZpDmAkEC6qhGmtEMfxGecGAEu3AF0dBJn0TiB43B2ASC09AP+/MNPMXRcYM0YrsxAV4GcIn1YFVREAY8al4ZUAUJkQXmoAHuenswCYFN5kBhy0n0oKwOOvrwrg9q1NeNhoyQmg7jiG7/Gf8wKwqgzaj/fAMqpyAkhUr1tlx7HO7fgpAP6sUfqpuXMPTMamBsk1gESTSvwiDz4RQmYNggBirADAFohzOAM+f3i3HXTFyXvxCrI46HaOg25nS/oZEHQ7x2FXwFz+2DmSHkA4b/ihEYCGFQCLdGFaoKw6gNZuC/r9PkRRBLuNpnoAoigabYBer1cMAJ03L9QFIN6+hI319ZmDJGWfQEjCN+835AYgMoYv1BAUSwyfSwCbN28sLXwuAezcvbO08CVNO8wdgO/fvkD84+vIRHaFV7wDiOwKEYDACgixBQTOgBCHoMAtEOIaFHgHhHgICbUuQRQKRYqkvwIv8Q8rRrOvAAAAAElFTkSuQmCC" /><br></br>Courses Requests </MDBTabsLink>
                </MDBCol>
                <MDBCol size='3' style={{ cursor: "pointer", boxShadow: "0px 1px 8px 2px grey", marginLeft: "20px" }} className='admin-list'><MDBTabsLink className='flex-column text-center' style={{ marginTop: "20px" }} onClick={() => handleVerticalClick('tab7')} active={verticalActive === 'tab7'}><img style={{ marginTop: "-14px" }} src="https://img.icons8.com/glyph-neue/64/null/refund.png" /><br></br>Refund Requests </MDBTabsLink>
                </MDBCol>
                <MDBCol size='1'></MDBCol>
                <MDBCol size='1'></MDBCol>

                <MDBCol size='9' style={{ cursor: "pointer", boxShadow: "0px 1px 8px 2px grey", marginLeft: "20px" }} className='admin-list'><MDBTabsLink className='flex-column text-center' style={{ marginTop: "20px" }} onClick={goToReports} ><img src="https://img.icons8.com/external-sbts2018-outline-sbts2018/58/null/external-issue-basic-ui-elements-2.5-sbts2018-outline-sbts2018.png" /><br></br>Reports and follow ups </MDBTabsLink>
                </MDBCol>
            </MDBRow>
            {((verticalActive === 'tab2') || (verticalActive === 'tab3') || (verticalActive === 'tab4') || (verticalActive === 'tab5') || (verticalActive === 'tab6') || (verticalActive === 'tab7') || (verticalActive === 'tab8')) && <img title="Check below" style={{ cursor: "pointer", marginLeft: "88%", marginTop: "10px" }} onClick={godown} width="5%" src="https://img.icons8.com/ios-filled/50/null/double-down.png" />}

            <MDBRow style={{ marginLeft: "25%", borderRadius: "20px", marginTop: "10px" }}>

                <MDBCol size='9'>
                    <MDBTabsContent >
                        <MDBTabsPane show={verticalActive === 'tab1'}></MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab2'}><AddInstructor /></MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab3'}><AddAdmin /></MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab4'}><AddCorporateTrainee /></MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab5'}><AdminAddDiscount /></MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab6'}><AdminAcceptCourses /></MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab7'}><AdminRefund /></MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'tab8'}><ViewReports /></MDBTabsPane>
                    </MDBTabsContent>
                </MDBCol>
            </MDBRow>

        </div>
    );
}
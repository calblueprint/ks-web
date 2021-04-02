// import React, { useState } from 'react';

// import SearchIcon from '@assets/search-icon.png';
// import { getAllFarmsForFarmSearch } from '@lib/farmUtils';

// import '@styles/FarmSearch.css';

// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// class FarmSearchBar extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       farms: [],
//       search: null

//     };
//   }

//   async componentDidMount() {
//     const farms = await getAllFarmsForFarmSearch();
//     this.setState({ farms });
//   }

//   searchSpace = e => {
//     let keyword = e.target.value;
//     this.setState({ search: keyword });
//   };

//   render() {
//     const { farms } = this.state;
//     const {
//       contactFirstName,
//       contactLastName,
//       address: farmAddress,
//       phone,
//       farmName,
//       farmEmail: email,
//       GroupGapContactIds: inspector,
//       certificationDate
//     } = farm;
//     const farmerName = `${contactFirstName} ${contactLastName}`;
//     const useStyles = makeStyles({
//       table: {
//         minWidth: 650
//       }
//     });
//     console.log(farms)
//     console.log(this.state.search)
//     return (
//     <div>
//       <div className="farm-search__input">
//         <input
//           type="text"
//           placeholder="Search by Farm Name or Contact Name"
//           //name="search"
//           onChange={event => this.searchSpace(event)}
//         />
//         {farms.len > 0 && farms.filter(farm => {
//             if (this.state.search === null) {

//               return farm;
//             } else if (farmerName.toLowerCase().includes(this.state.search.toLowerCase())) {
//               return farm;
//             }
//           })
//           .map(farm => {
//             return (
//               <div
//                 className="farm-search_search-bar"
//                 key={farm.farmId}
//                 farm={farm}
//               >
//                 {farm.contactFirstName}
//                 {farmerName}
//                 {farm.farmName}
//                 {farm.GroupGapContactIds}
//                 {farm.certificationdate}
//               </div>
//             );
//           })}
//         <img type="image" src={SearchIcon} alt="searchIcon" />
//       </div>
//     </div>
//     );
//   }
// }

// export default FarmSearchBar;

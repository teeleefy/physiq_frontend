// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import { FamilyContext } from '../src/auth/UserContext';
// import { MemberContext } from '../src/auth/UserContext';

// const currentFamily = { id: 1, name: "The Smith Family", email: "smith@smith.com" }
// let currentMember={id: 2, firstName: "Sarah", lastName: "Smith", birthday: "1980-09-03"}


// const renderWithRouter = (component, { route = '/' } = {}) => {
//   window.history.pushState({}, 'Test page', route);

//   return render(component, { wrapper: MemoryRouter });
// };

// const renderWithRouterAndFamilyContext = (component, { route = '/'} = {}) => {
//   window.history.pushState({}, 'Test page', route);

//   return render(
//     <MemoryRouter>
//       <FamilyContext.Provider value={{ currentFamily }}>
//         {component}
//       </FamilyContext.Provider>
//     </MemoryRouter>
//   );
// };

// const renderWithRouterAndMemberContext = (component, { route = '/'} = {}) => {
//   window.history.pushState({}, 'Test page', route);

//   return render(
//     <MemoryRouter>
//       <MemberContext.Provider value={{ currentMember }}>
//         {component}
//       </MemberContext.Provider>
//     </MemoryRouter>
//   );
// };

// const renderWithRouterAndLoggedOutContext = (component, { route = '/'} = {}) => {
//   window.history.pushState({}, 'Test page', route);

//   return render(
//     <MemoryRouter>
//       <FamilyContext.Provider value={{ }}>
//         {component}
//       </FamilyContext.Provider>
//     </MemoryRouter>
//   );
// };


// export * from '@testing-library/react';
// export { renderWithRouter, renderWithRouterAndFamilyContext, renderWithRouterAndMemberContext, renderWithRouterAndLoggedOutContext };

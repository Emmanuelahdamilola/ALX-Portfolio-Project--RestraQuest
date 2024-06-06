import { GraphQLClient, gql } from 'graphql-request';

// URL for the GraphQL backend API
const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// Initialize GraphQL client
const client = new GraphQLClient(MASTER_URL);

// Function to fetch category data from API
export const GetCategory = async () => {
  const query = gql`
    query Categories {
      categories(first: 40) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
  `;
  try {
    const result = await client.request(query);
    return result;
  } catch (error) {
    console.error("GraphQL Request Error: ", error);
    throw error;
  }
};

// Function to fetch business data from API based on category
export const GetBusiness = async (category) => {
  const query = gql`
    query GetBusiness {
      restaurants(where: {categories_some: {slug: "${category}"}}) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restraType
        slug
        workingHours
        reviews {
          star
        }
      }
    }
  `;
  try {
    const result = await client.request(query);
    return result;
  } catch (error) {
    console.error("GraphQL Request Error: ", error);
    throw error;
  }
};

// Function to fetch business details from API based on business slug
export const GetBusinessDetail = async (businessSlug) => {
  const query = gql`
    query RestaurantDetail {
      restaurant(where: {slug: "${businessSlug}"}) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restraType
        slug
        workingHours
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                description
                price
                productImage {
                  url
                }
              }
            }
          }
        }
        reviews {
          star
        }
      }
    }
  `;
  try {
    const result = await client.request(query);
    return result;
  } catch (error) {
    console.error("GraphQL Request Error: ", error);
    throw error;
  }
};

// Function to add items to the cart
export const AddToCart = async (data) => {
  const query = gql`
    mutation AddToCart {
      createUserCart(
        data: {email: "${data.email}", price: ${data.price}, productDescription: "${data.description}", productImage: "${data.productImage}", productName: "${data.name}"  restaurant: {connect: {slug: "${data.restaurantSlug}"}}}
      ) {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;
  try {
    const result = await client.request(query);
    return result;
  } catch (error) {
    console.error("GraphQL Request Error: ", error);
    throw error;
  }
};

// Function to fetch user's cart data
export const UserCart = async (userEmail) => {
  const query = gql`
    query GetUserCart {
      userCarts(where: {email: "${userEmail}"}) {
        id
        price
        productDescription
        productImage
        productName
        restaurant {
          name
          slug
          workingHours
          banner {
            url
          }
        }
      }
    }
  `;
  try {
    const result = await client.request(query);
    return result;
  } catch (error) {
    console.error("GraphQL Request Error: ", error);
    throw error;
  }
};

// Function to remove a restaurant from the user's cart
export const RemoveRestaurantFromCart = async (id) => {
  const query = gql`
    mutation DisconnectResturantFromCart {
      updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "${id}"})
      {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;
  try {
    const result = await client.request(query);
    return result;
  } catch (error) {
    console.error("GraphQL Request Error: ", error);
    throw error;
  }
};

// Function to delete an item from the user's cart
export const DeleteItemFromCart = async(id) => {
  const query = gql`
    mutation DeleteCartItem {
      deleteUserCart(where: {id: "${id}"}) {
        id
      }
    }
  `;
  try {
    const result = await client.request(query);
    return result;
  } catch (error) {
    console.error("GraphQL Request Error: ", error);
    throw error;
  }
};

// Function to add a new review for a restaurant
export const AddNewReview = async (data) => {
  const query = gql`
    mutation AddNewReview {
      createReview(
        data: {email: "${data.email}",
          profileimage: "${data.profileImage}",
          reviewText: "${data.reviewText}",
          star: ${data.star},
          userName: "${data.userName}",
          restaurant: {connect: {slug: "${data.RestraSlug}"}}}
      ) {
        id
      }
      publishManyReviews(to: PUBLISHED) {
        count
      }
    }
  `;
  try {
    const result = await client.request(query);
    return result;
  } catch (error) {
    console.error("GraphQL Request Error: ", error);
    throw error;
  }
};

// Function to fetch reviews for a restaurant
export const RestaurantReviews = async (slug) => {
  const query = gql`
    query RestaurantReviews {
      reviews(where: {restaurant: {slug: "${slug}"}}, orderBy: publishedAt_DESC) {
        id
        profileimage
        publishedAt
        star
        userName
        email
        reviewText
      }
    }
  `;
  try
  {
    const result = await client.request(query);
    return result;
    } catch (error) {
      console.error("GraphQL Request Error: ", error);
      throw error;
    }
  };
  
  // Function to create a new order
  export const CreateNewOrder = async (data) => {
    const query = gql`
      mutation NewOrder {
        createOrder(
          data: {
            email: "${data.email}", 
            orderAmount: ${data.orderAmount}, 
            restaurantName: "${data.restaurantName}", 
            userName: "${data.userName}", 
            phoneNumber: "${data.phoneNumber}", 
            zipCode: "${data.zipCode}", 
            address: "${data.address}"}
        ) {
          address
          id
        }
      }
    `;
    try {
      const result = await client.request(query);
      return result;
    } catch (error) {
      console.error("GraphQL Request Error: ", error);
      throw error;
    }
  };
  
  // Function to update an order to added order
  export const UpdateOrderToAddedOrder = async (name, price, id, email) => {
    const query = gql`
      mutation UpdateOrderWithDetail {
        updateOrder(
          data: {
            orderDetail: {
              create: {
                OrderItem: {
                  data: {
                    name: "${name}", 
                    price: ${price}
                  }
                }
              }
            }
          }
          where: {id: "${id}"}
        ) {
          id
        }
        publishManyOrders(to: PUBLISHED) {
          count
        }
        deleteManyUserCarts(where: {email: "${email}"}) {
          count
        }
      }
    `;
    try {
      const result = await client.request(query);
      return result;
    } catch (error) {
      console.error("GraphQL Request Error: ", error);
      throw error;
    }
  };
  
  // Function to fetch user's orders
  export const UserOrders = async (email) => {
    const query = gql`
      query UserOrders {
        orders(where: {email: "${email}"}, orderBy: createdAt_ASC) {
          address
          createdAt
          email
          id
          orderAmount
          orderDetail {
            ... on OrderItem {
              id
              name
              price
            }
          }
          phoneNumber
          restaurantName
          userName
          zipCode
        }
      }
    `;
    try {
      const result = await client.request(query);
      return result;
    } catch (error) {
      console.error("GraphQL Request Error: ", error);
      throw error;
    }
  };
  
  export default {
    GetCategory,
    GetBusiness,
    GetBusinessDetail,
    AddToCart,
    UserCart,
    RemoveRestaurantFromCart,
    DeleteItemFromCart,
    AddNewReview,
    RestaurantReviews,
    CreateNewOrder,
    UpdateOrderToAddedOrder,
    UserOrders
  };
  
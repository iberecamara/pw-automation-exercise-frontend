import { ProductType } from '@data/model/product.model';
import { test } from '@fixtures/fixtures';

test.describe('Cart validations', async () => {

    test('Validate adding Products to Cart',
        { tag: ['@TC12', '@products', '@cart'] },
        async ({
            logger, page, homeSteps, homePage, productsSteps, productsPage, sharedSteps, cartPage, cartSteps
        }) => {
            await sharedSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await sharedSteps.clickProducts(logger, homePage.header);
            await productsSteps.validateProductsTitle(logger, page);

            const quantity = 1;

            const firstProductName = 'Blue Top';
            const firstProductData: ProductType = await productsSteps.getProductDetails(logger, productsPage, firstProductName);
            firstProductData.index = 1;
            firstProductData.quantity = quantity;
            firstProductData.category = 'Women > Tops';
            firstProductData.totalPrice = firstProductData.quantity * firstProductData.price;

            const secondProductName = 'Men Tshirt';
            const secondProductData: ProductType = await productsSteps.getProductDetails(logger, productsPage, secondProductName);
            secondProductData.index = 2;
            secondProductData.quantity = quantity;
            secondProductData.category = 'Men > Tshirts';
            secondProductData.totalPrice = secondProductData.quantity * secondProductData.price;

            await productsSteps.hoverProduct(logger, productsPage, firstProductName);
            await productsSteps.addProductToCartFromHover(logger, productsPage, firstProductName);
            await productsSteps.continueShopping(logger, productsPage);
            await productsSteps.hoverProduct(logger, productsPage, secondProductName);
            await productsSteps.addProductToCartFromHover(logger, productsPage, secondProductName);
            await productsSteps.continueShopping(logger, productsPage);
            await sharedSteps.clickCart(logger, productsPage.header);
            const items = await cartSteps.getCartProducts(logger, cartPage);
            await cartSteps.validateCartItems(logger, items, [firstProductData, secondProductData]);
        });

});

import { ResumedProductType, FullProductType } from '@data/model/product.model';
import { test } from '@fixtures/fixtures';

test.describe('Products page', async () => {

    test('Validate Products page',
        { tag: ['@TC8', '@products'] },
        async ({
            logger, page, homeSteps, homePage, productsSteps, productsPage, productSteps, productPage
        }) => {
            await homeSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await homeSteps.clickProducts(logger, homePage);
            await productsSteps.validateProductsTitle(logger, page);
            const count = await productsSteps.getProductsCount(logger, productsPage);
            const expectedCount = 34;
            await productsSteps.validateProductsCount(logger, count, expectedCount);
            const firstProduct: FullProductType = {
                index: 1,
                name: 'Blue Top',
                category: 'Women > Tops',
                price: 500,
                availability: 'In Stock',
                condition: 'New',
                brand: 'Polo'
            };
            await productsSteps.navigateToProductView(logger, productsPage, firstProduct.index);
            const productDetails: FullProductType = await productPage.getProductDetails();
            await productSteps.validateProductDetails(logger, firstProduct, productDetails);
        });

    test('Validate Search in Products page',
        { tag: ['@TC9', '@products', '@search-products'] },
        async ({
            logger, page, homeSteps, homePage, productsSteps, productsPage
        }) => {
            await homeSteps.navigateHome(logger, homePage);
            await homeSteps.validateHomeTitle(logger, page);
            await homeSteps.clickProducts(logger, homePage);
            await productsSteps.validateProductsTitle(logger, page);
            const searchTerm: string = 'blue';
            await productsSteps.searchProducts(logger, productsPage, searchTerm);
            const products: ResumedProductType[] = await productsSteps.getProducts(logger, productsPage);
            productsSteps.validateDisplayedProductsHaveSearchTerm(logger, products, searchTerm);
        });

});

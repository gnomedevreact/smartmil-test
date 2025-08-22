import { useMemo, useState } from 'react';
import type { Product } from '../../../shared/models/types/product.types.ts';
import { useGetProducts } from '../../../shared/api/hooks/useGetProducts.ts';
import { HEADERS } from '../lib/consts.ts';
import { ProductModal } from '../../ProductModal/ui/ProductModal.tsx';
import { useDeleteProduct } from '../../../shared/api/hooks/useDeleteProduct.ts';

const TableRow = ({
  product,
  setModalState,
}: {
  product: Product;
  setModalState: (data: { isOpen: boolean; product?: Product }) => void;
}) => {
  const { deleteProduct } = useDeleteProduct();

  return (
    <div className={'flex items-center gap-10 px-3 py-4 [&>div]:basis-1/4'}>
      <div>{product.name}</div>
      <div>{product.article}</div>
      <div>{product.price}</div>
      <div>{product.quantity}</div>
      <div className={'flex items-center gap-1 cursor-default'}>
        <button
          className={'text-blue-400 cursor-pointer'}
          onClick={() => setModalState({ isOpen: true, product })}
        >
          Edit
        </button>
        /
        <button
          className={'text-red-500 cursor-pointer'}
          onClick={() => deleteProduct(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [limit, _] = useState(2);
  const [modalState, setModalState] = useState<{ isOpen: boolean; product?: Product }>({
    isOpen: false,
    product: undefined,
  });

  const { products, isLoading } = useGetProducts(page, limit);

  const totalPages = useMemo(() => {
    return Math.ceil((products?.total || 1) / limit);
  }, [limit, products]);

  const switchPage = (forward: boolean) => {
    setPage((prevState) => {
      if ((prevState === totalPages && forward) || (prevState === 1 && !forward)) {
        return prevState;
      }
      return forward ? prevState + 1 : prevState - 1;
    });
  };

  return (
    <>
      <button
        className={'p-3 bg-black text-white'}
        onClick={() => setModalState({ isOpen: true, product: undefined })}
      >
        Добавить
      </button>
      <div
        className={
          'flex flex-col text-white rounded-xl overflow-hidden bg-primary-200 min-h-[300px]'
        }
      >
        <div
          className={
            'flex items-center gap-10 px-3 py-2 bg-primary-100/90 [&>div]:basis-1/4'
          }
        >
          {HEADERS.map((header, i) => (
            <div className={'[&:not(:last-child)]:border-r border-gray-600'} key={i}>
              {header}
            </div>
          ))}
        </div>
        {isLoading ? (
          <div className={'w-full h-full'}>Loading...</div>
        ) : (
          <>
            <div className={'flex flex-col bg-primary-200 min-h-[56px]'}>
              {products?.data.length === 0 && <p>No data</p>}
              {products?.data.map((product, i) => (
                <TableRow product={product} setModalState={setModalState} key={i} />
              ))}
            </div>
            <div className={'flex justify-end gap-5 bg-primary-200 px-3 py-2 mt-auto!'}>
              <div className={'flex items-center gap-2'}>
                <button className={'cursor-pointer'} onClick={() => switchPage(false)}>
                  Previous
                </button>
                <button className={'cursor-pointer'} onClick={() => switchPage(true)}>
                  Next
                </button>
              </div>
              <div>
                <p className={'cursor-default'}>{`${page}/${totalPages}`}</p>
              </div>
            </div>
          </>
        )}
      </div>
      {modalState.isOpen && (
        <ProductModal setModalState={setModalState} product={modalState.product} />
      )}
    </>
  );
};

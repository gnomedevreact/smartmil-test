import { useForm } from 'react-hook-form';
import { useProductMutations } from '../../../shared/api/hooks/useProductMutations.ts';
import type { Product } from '../../../shared/models/types/product.types.ts';

interface ProductModalProps {
  product?: Product;
  setModalState: (data: { isOpen: boolean; productId?: number }) => void;
}

type FormData = {
  name: string;
  article: string;
  price: number;
  quantity: number;
};

export const ProductModal = (props: ProductModalProps) => {
  const { setModalState, product } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: product?.name || '',
      article: product?.article || '',
      price: product?.price || 10,
      quantity: product?.quantity || 10,
    },
  });
  const { createProduct, updateProduct, isPending } = useProductMutations();

  const submit = async (formData: FormData) => {
    !product
      ? await createProduct(formData)
      : await updateProduct({ id: product.id, product: formData });
    reset();
    setModalState({ isOpen: false });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={() => setModalState({ isOpen: false })}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-150 ${'opacity-100'}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl transition-all duration-150
              ${'opacity-100 translate-y-0 scale-100'}`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Создать продукт</h2>
          <button
            onClick={() => setModalState({ isOpen: false })}
            className="rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm text-neutral-300">Название</label>
            <input
              {...register('name', { required: 'Обязательное поле' })}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-white outline-none focus:border-neutral-500"
              placeholder="Хлеб"
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm text-neutral-300">Артикул</label>
            <input
              {...register('article', { required: 'Обязательное поле' })}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-white outline-none focus:border-neutral-500"
              placeholder="NB-001"
            />
            {errors.article && (
              <p className="text-xs text-red-400">{errors.article.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm text-neutral-300">Цена</label>
              <input
                type="number"
                inputMode="decimal"
                {...register('price', {
                  valueAsNumber: true,
                  required: 'Обязательное поле',
                  min: { value: 1, message: 'Не меньше 1' },
                })}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-white outline-none focus:border-neutral-500"
                placeholder="899"
              />
              {errors.price && (
                <p className="text-xs text-red-400">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm text-neutral-300">Количество</label>
              <input
                type="number"
                inputMode="numeric"
                {...register('quantity', {
                  valueAsNumber: true,
                  required: 'Обязательное поле',
                  min: { value: 0, message: 'Минимум 0' },
                })}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-white outline-none focus:border-neutral-500"
                placeholder="5"
              />
              {errors.quantity && (
                <p className="text-xs text-red-400">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalState({ isOpen: false })}
              className="rounded-lg border border-neutral-700 px-4 py-2 text-neutral-200 hover:bg-neutral-800 transition"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`rounded-lg px-4 py-2 text-white transition-opacity ${isPending ? 'opacity-60' : 'opacity-100 hover:opacity-80'} bg-blue-600`}
            >
              {isPending ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

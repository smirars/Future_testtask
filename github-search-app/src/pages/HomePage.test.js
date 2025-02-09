import { getErrorMessage } from "../pages/HomePage";

test("getErrorMessage возвращает правильные сообщения", () => {
  expect(getErrorMessage({ status: 404 })).toBe("Такого пользователя не существует.");
  expect(getErrorMessage({ status: 403 })).toBe("Превышен лимит запросов к API GitHub.");
  expect(getErrorMessage({ status: 500 })).toBe("Ошибка сервера. Попробуйте позже.");
  expect(getErrorMessage(null)).toBe(null);
  expect(getErrorMessage({ status: 123 })).toBe("Произошла ошибка. Попробуйте снова.");
});
